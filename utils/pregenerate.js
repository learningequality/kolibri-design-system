const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const docGenAPI = require('vue-docgen-api');
const globby = require('globby');
const consola = require('consola');

/***********************************/
/*  Extract component API          */

const docsOutputString = `
/*
  This file is auto-generated and ignored by git.
  See the jsdocs-related scripts in package.json and pregenerate.js
*/

export default `;

async function writeApi() {
  const componentFolder = path.resolve('./lib/');
  const simpleFiles = await globby('**/K*.vue', { cwd: componentFolder });
  const output = {};

  for (const filename of simpleFiles) {
    const filepath = path.resolve(componentFolder, filename);
    const val = await docGenAPI.parse(filepath);
    output[val.displayName] = val;
  }

  const complexFiles = await globby('**/K*/index.vue', { cwd: componentFolder });

  for (const filename of complexFiles) {
    const filepath = path.resolve(componentFolder, filename);
    const val = await docGenAPI.parse(filepath);
    output[val.displayName] = val;
  }

  const outputPath = path.resolve('./docs/jsdocs.js');
  fs.writeFileSync(outputPath, docsOutputString + JSON.stringify(output, null, 2));
  consola.info('Wrote jsdocs to', outputPath);
}

writeApi();

/***********************************/
/*  Extract Git branch info        */

function getGitBranch() {
  return new Promise(resolve => {
    const cmd = 'git rev-parse --abbrev-ref HEAD';
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        consola.error('Could not get git branch:', stderr);
        resolve('');
      }
      resolve(stdout.trim());
    });
  });
}

const gitOutputString = `
/*
  This file is auto-generated and ignored by git in order to
  provide back-links to GitHub source. See pregenerate.js
*/

export default `;

async function writeGit() {
  const gitBranch = await getGitBranch();
  const outputPath = path.resolve('./docs/gitBranch.js');
  fs.writeFileSync(outputPath, gitOutputString + JSON.stringify(gitBranch, null, 2));
  consola.info(`Wrote '${gitBranch}' to ${outputPath}`);
}

writeGit();
