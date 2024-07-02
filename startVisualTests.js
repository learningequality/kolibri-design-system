const { spawn } = require('child_process');
const net = require('net');
const fetch = require('node-fetch');
const psTree = require('ps-tree');

/* eslint-disable no-console */

const SERVER_URL = 'http://localhost:4000';
const SERVER_TIMEOUT = 360000;

const waitForServer = async (url, timeout = 30000) => {
  const start = Date.now();
  let waitingLogged = false;
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch (err) {
      if (!waitingLogged) {
        console.error('Waiting for server to respond.');
        waitingLogged = true;
      }
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error('Server did not start within the timeout period');
};

const checkPortInUse = port => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', err => {
      if (err.code === 'EADDRINUSE') {
        reject(new Error(`Port ${port} is already in use.`));
      } else {
        reject(err);
      }
    });

    server.once('listening', () => {
      server.close();
      resolve();
    });

    server.listen(port);
  });
};

const startServer = () => {
  return new Promise((resolve, reject) => {
    const server = spawn('yarn', ['dev-only'], { shell: true });

    server.on('error', err => {
      reject(new Error(`Failed to start server: ${err.message}`));
    });

    server.on('close', code => {
      console.log(`Server process exited with code ${code}`);
      if (code !== 0) {
        reject(new Error('Server failed to start'));
      }
    });

    waitForServer(SERVER_URL, SERVER_TIMEOUT)
      .then(() => {
        console.log('Server is up and running');
        resolve(server);
      })
      .catch(error => {
        server.kill('SIGINT');
        reject(error);
      });
  });
};

const runTests = () => {
  return new Promise((resolve, reject) => {
    const tests = spawn(
      'npx',
      [
        'percy',
        'exec',
        '-v',
        '--',
        'jest',
        '--config',
        'jest.conf/visual.index.js',
        '-i',
        './lib/buttons-and-links/__tests__/KButton.spec.js',
      ],
      { stdio: 'inherit' }
    );

    tests.on('close', code => {
      console.log(`Tests process exited with code ${code}`);
      resolve(code);
    });

    tests.on('error', error => {
      reject(error);
    });
  });
};

const stopServer = server => {
  return new Promise((resolve, reject) => {
    psTree(server.pid, (err, children) => {
      if (err) {
        return reject(err);
      }
      [server.pid, ...children.map(p => p.PID)].forEach(pid => {
        try {
          process.kill(pid, 'SIGINT');
        } catch (e) {
          if (e.code !== 'ESRCH') {
            reject(e);
          }
        }
      });
      resolve();
    });
  });
};

const validateTestRun = () => {
  if (!process.env.PERCY_TOKEN) {
    throw new Error(
      'PERCY_TOKEN environment variable is not set. Please set it to run visual tests.'
    );
  }
};

const start = async () => {
  validateTestRun();
  let server;
  try {
    await checkPortInUse(4000);
    server = await startServer();
    const testExitCode = await runTests();
    await stopServer(server);
    process.exit(testExitCode);
  } catch (error) {
    console.error(error);
    if (server) {
      await stopServer(server);
    }
    process.exit(1);
  }
};

start();
