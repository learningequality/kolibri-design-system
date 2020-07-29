const path = require('path');
const fs = require('fs');
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
/*  Extract env info from Netlify  */

// https://docs.netlify.com/configure-builds/environment-variables/#netlify-configuration-variables
function getEnvironmentInfo() {
  // probably running local dev environment
  if (!process.env.NETLIFY) {
    return { local: true };
  }
  const env = {
    local: false,
    branch: process.env.BRANCH,
  };
  // BRANCH is something like `v0.2.x` or `develop`
  if (!process.env.PULL_REQUEST) {
    env.url = process.env.REPOSITORY_URL + '/tree/' + env.branch;
    return env;
  }
  // BRANCH might be something like `pull/79/head`
  const reMatch = /^(pull\/\d+)\/head$/.exec(process.env.BRANCH);
  if (reMatch) {
    env.branch = reMatch[1]; // strip off the '/head' part
  }
  env.url = process.env.REPOSITORY_URL + '/' + env.branch;
  return env;
}

const gitOutputString = `
/*
  This file is auto-generated and ignored by git in order to
  provide back-links to GitHub source. See pregenerate.js
*/

export default `;

function writeGit() {
  const environmentInfo = getEnvironmentInfo();
  const outputPath = path.resolve('./docs/environment.js');
  const env = JSON.stringify(environmentInfo, null, 2);
  fs.writeFileSync(outputPath, gitOutputString + env + ';\n');
  consola.info(`Wrote environment to ${outputPath}:\n${env}`);
}

writeGit();
