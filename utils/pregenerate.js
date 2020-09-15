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

writeApi();

/***********************************/
/*  Extract env info from Netlify  */

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

function writeGit() {
  const environmentInfo = getEnvironmentInfo();
  const outputPath = path.resolve('./docs/environment.js');
  const env = JSON.stringify(environmentInfo, null, 2);
  fs.writeFile(outputPath, gitOutputString + env + ';\n', () =>
    consola.info(`Wrote environment to ${outputPath}`)
  );
}

writeGit();

/*****************************************************/
/*  Extract icon svgs from vue files for rst docs

  This command generates sphinx restructured text replacements for use in docs,
  specifically for the `rst_prolog` variable [1]. This allows a design-system alias
  enclosed in pipe characters (like ``|close|``) used in reStructuredText documents
  to be replaced with an inline SVG

  CSS classes referenced below correspond to styles in theme_overrides.css in the user
  docs, and allow the icons to be set to their default colors.

  The logic in this command is somewhat brittle as it's based on regex. This was the
  most straightforward way to implement the logic, but it also means that subsequent
  changes to the implementation of iconDefinitions.js and KIcon might break this.

  A slightly preferable implementation might be to extract this information during the
  precompileSvgs.js process, importing iconDefinitions.js directly, and parsing the
  information as real javascript. However this would require webpack tooling which
  is – at present – unavailable to this pre-processing script. We also might want to
  consider a different source of truth besides iconDefinitions.js, but this was deemed
  useful in order to avoid making the `require` statements inside dynamic [2].

  True, parsing arbitrary HTML and js with regex is horrible [3], but parsing files with
  known and predictable structures might be forgiven [4].

    [1] https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-rst_prolog
    [2] https://webpack.js.org/guides/code-splitting/#dynamic-imports
    [3] https://stackoverflow.com/a/1732454/3341621
    [4] https://stackoverflow.com/a/1733489/3341621
 */

// Within iconDefinitions.js, match the main object: `const KolibriIcons = {...}`
const MAIN_OBJECT_PATTERN = /const KolibriIcons = {(.*?\n)}/s;

// Within the main object, match all individual definition objects: `  someIconName: { icon: require('./some/icon/path'), ...}`
const ICON_DEFINITION_PATTERN = /\n {2}(\w+): {.*?\s+icon:\s+require\('(.+?)'\).*?},/gs;

// Within a definition object, match a defaultColor attribute: `defaultColor: themeTokens().someColor`
const ICON_DEFINITION_COLOR_PATTERN = /defaultColor:\s+themeTokens\(\)\.(\w+)/s;

// Within an icon file, match just the SVG tag
const TEMPLATE_PATTERN = /<svg.*?\/><\/svg>/;

// Load iconDefinitions.js as a simple text file
fs.readFile('./lib/KIcon/iconDefinitions.js', 'utf8', (err, iconDefinitions) => {
  if (err) throw err;

  // extract the content of the main definition object
  const mainObjectBody = iconDefinitions.match(MAIN_OBJECT_PATTERN)[1];

  // process all icon definitions
  const output = [];
  let iconDefinitionMatch;
  while ((iconDefinitionMatch = ICON_DEFINITION_PATTERN.exec(mainObjectBody)) !== null) {
    // where is the vue file and what's in it?
    const vueFilePath = path.resolve(path.join('./lib/KIcon/', iconDefinitionMatch[2]));
    const vueFileContent = fs.readFileSync(vueFilePath, 'utf8');
    const svgContent = vueFileContent.match(TEMPLATE_PATTERN)[0];
    const aliasName = iconDefinitionMatch[1];

    // does it have a default color?
    const colorMatch = iconDefinitionMatch[0].match(ICON_DEFINITION_COLOR_PATTERN);

    // what to dump into icon-replacements.txt? (used in rst_prolog)
    const wrapperSpanColorClass = colorMatch ? ` design-system-icon-color-${colorMatch[1]}` : '';
    output.push(
      `.. |${aliasName}| replace:: :raw-html:\`<span class="design-system-icon${wrapperSpanColorClass}">${svgContent}</span>\``
    );
  }

  // create file
  output.sort();
  const outputPath = path.resolve('./docs/rstIconReplacements.txt');
  fs.writeFile(outputPath, output.join('\n') + '\n', () =>
    consola.info(`Wrote rst icon replacement strings to ${outputPath}`)
  );
});
