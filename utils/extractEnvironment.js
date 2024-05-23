const path = require('node:path');
const fs = require('node:fs');
const consola = require('consola');

/***********************************/
/*  Extract env info               */

// https://docs.netlify.com/configure-builds/environment-variables/#netlify-configuration-variables
function getEnvironmentInfo() {
  // debug info
  const info = ` Netlify environment variables:
    NETLIFY:        ${process.env.NETLIFY}
    BRANCH:         ${process.env.BRANCH}
    PULL_REQUEST:   ${process.env.PULL_REQUEST}
    REPOSITORY_URL: ${process.env.REPOSITORY_URL}`;
  consola.info(info);

  // probably running local dev environment
  if (!process.env.NETLIFY) {
    return { local: true };
  }
  const env = {
    local: false,
    branch: process.env.BRANCH,
  };

  // BRANCH is something like `v0.2.x` or `develop`
  if (!process.env.PULL_REQUEST || process.env.PULL_REQUEST === 'false') {
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

function writeEnvironment() {
  const environmentInfo = getEnvironmentInfo();
  const outputPath = path.resolve('./docs/environment.js');
  const env = JSON.stringify(environmentInfo, null, 2);
  fs.writeFile(outputPath, gitOutputString + env + ';\n', () =>
    consola.info(`Wrote environment to ${outputPath}`)
  );
}

exports.writeEnvironment = writeEnvironment;

// https://stackoverflow.com/a/6398335
if (require.main === module) {
  writeEnvironment();
}
