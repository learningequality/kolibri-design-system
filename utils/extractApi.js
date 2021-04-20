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
  fs.writeFile(outputPath, docsOutputString + JSON.stringify(output, null, 2), () =>
    consola.info('Wrote jsdocs to', outputPath)
  );
}

exports.writeApi = writeApi;

// https://stackoverflow.com/a/6398335
if (require.main === module) {
  writeApi();
}
