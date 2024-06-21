const { spawn } = require('child_process');
const fetch = require('node-fetch');

/* eslint-disable no-console */

const serverUrl = 'http://localhost:4000';
const serverTimeout = 360000; // 6 minutes

const waitForServer = async (url, timeout = 30000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch (err) {
      console.error('Waiting for server to respond.');
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error('Server did not start within the timeout period');
};

const killPortProcess = async port => {
  try {
    const fkill = await import('fkill');
    await fkill(`:${port}`, { force: true });
    console.log(
      `Another process detected on port: ${port}. The process will be killed automatically.`
    );
  } catch (error) {
    console.log(`Starting devserver on port: ${port}`);
  }
};

const startServer = () => {
  return new Promise((resolve, reject) => {
    const server = spawn('yarn', ['dev-only']);

    server.on('close', code => {
      console.log(`Server process exited with code ${code}`);
      if (code !== 0) {
        reject(new Error('Server failed to start'));
      }
    });

    waitForServer(serverUrl, serverTimeout)
      .then(() => {
        console.log('Server is up and running');
        resolve(server);
      })
      .catch(error => {
        server.kill();
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
        './lib/KImg/__tests__/KImg.spec.js',
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

const start = async () => {
  try {
    await killPortProcess(4000);
    const server = await startServer();
    const testExitCode = await runTests();
    server.kill();
    process.exit(testExitCode);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
