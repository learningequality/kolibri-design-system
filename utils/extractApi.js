const path = require('node:path');
const fs = require('node:fs');
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

function notTest(filePath) {
  return !filePath.includes('.spec.');
}

async function writeApi() {
  const componentFolder = path.resolve('./lib/');
  const simpleFiles = await globby('**/K*.{vue,js}', { cwd: componentFolder });
  const output = {};

  for (const filename of simpleFiles.filter(notTest)) {
    const filepath = path.resolve(componentFolder, filename);
    try {
      const val = await docGenAPI.parse(filepath);
      output[val.displayName] = val;
    } catch (e) {
      consola.warn(`Could not extract docs from ${filepath}`);
    }
  }

  const complexFiles = await globby('**/K*/index.{vue,js}', { cwd: componentFolder });

  for (const filename of complexFiles.filter(notTest)) {
    const filepath = path.resolve(componentFolder, filename);
    try {
      const val = await docGenAPI.parse(filepath);
      output[val.displayName] = val;
    } catch (e) {
      consola.warn(`Could not extract docs from ${filepath}`);
    }
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
