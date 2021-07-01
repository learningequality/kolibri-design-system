/**
 * Print gif diff of publicly exposed Vue icons
 * (defined in 'lib/KIcon/precompiled-icons/iconDefinitions.js')
 * to allow for easier before/after precompilation preview
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const consola = require('consola');

const ICONS_DEFINITIONS_PATH = './lib/KIcon/iconDefinitions.js';

// Within the main icon definitions object, match all individual definition objects:
// `someIconName: { icon: require('./some/icon/path'), ...}`
// (taken from extractRstIcons.js)
const ICON_DEFINITION_PATTERN = /\n {2}(\w+): {.*?\s+icon:\s+require\('(.+?)'\).*?},/gs;

function print() {
  fs.readFile(ICONS_DEFINITIONS_PATH, 'utf8', (error, iconsDefinitions) => {
    if (error) {
      consola.error(`Can't open icons definitions file: "${ICONS_DEFINITIONS_PATH}"`);
      return;
    }

    let iconDefinitionMatch;
    while ((iconDefinitionMatch = ICON_DEFINITION_PATTERN.exec(iconsDefinitions)) !== null) {
      const iconAlias = iconDefinitionMatch[1];
      const iconPath = path.resolve(path.join('./lib/KIcon/', iconDefinitionMatch[2]));

      exec('git diff ' + iconPath, (error, stdout, stderr) => {
        if (error) {
          consola.error(error.message);
          return;
        }
        if (stderr) {
          consola.error(stderr);
          return;
        }
        consola.info(`Icon name: ${iconAlias}`);
        if (stdout.length === 0) {
          consola.info('No updates \n');
        } else {
          consola.info('Icon has been updated');
          consola.info('Git diff:');
          consola.info(`${stdout}\n`);
        }
      });
    }
  });
}

exports.print = print;
