const path = require('path');
const fs = require('fs');
const docGenAPI = require('vue-docgen-api');
const globby = require('globby');
const consola = require('consola');

const outputString = `
/*
  This file is auto-generated and ignored by git.
  See the jsdocs-related scripts in package.json and parseJsDocs.js
*/

export default `;

async function writeJson() {
  const componentFolder = path.resolve('./lib/');
  const files = await globby('**/K*.vue', { cwd: componentFolder });
  const output = {};

  for (const filename of files) {
    const filepath = path.resolve(componentFolder, filename);
    const val = await docGenAPI.parse(filepath);
    output[val.displayName] = val;
  }
  const outputPath = path.resolve('./docs/jsdocs.js');
  fs.writeFileSync(outputPath, outputString + JSON.stringify(output, null, 2));
  consola.info('Wrote jsdocs to', outputPath);
}

writeJson();
