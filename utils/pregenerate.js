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
  // local env
  if (!process.env.NETLIFY) {
    return { local: true };
  }
  // netlify PR
  if (process.env.PULL_REQUEST) {
    // BRANCH is something like `pull/79/head`
    return {
      local: false,
      url: process.env.REPOSITORY_URL + '/' + process.env.BRANCH,
    };
  }
  // BRANCH is something like `v0.2.x` or `develop`
  return {
    local: false,
    url: process.env.REPOSITORY_URL + '/tree/' + process.env.BRANCH,
  };
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
  fs.writeFileSync(outputPath, gitOutputString + JSON.stringify(environmentInfo, null, 2) + ';');
  consola.info(`Wrote '${environmentInfo}' to ${outputPath}`);
}

writeGit();
