/*
  Do not run this file directly. Instead use:
  yarn run precompile-svgs
*/

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const consola = require('consola');
var rimraf = require('rimraf');

const SVGO = require('svgo');

var svgo = new SVGO(); // You use this one.

const precompilationDiff = require('./precompilationDiff.js');

// Some attrs used during SVG optimization
const a11yAttrs = `role="presentation" focusable="false"`;
const viewBox = `viewBox="0 0 24 24"`;

// This is where we will be putting the precompiled Vue files
const basePathForPrecompiledSvgs = './lib/KIcon/precompiled-icons';

/**
 * Tell the script where to get icons and how to namespace them.
 *
 * `iconLibPath` is where we find the original icon SVG files
 * `namespace` is appended to basePathForPrecompiledSvgs to namespace the libraries
 */

const config = [
  // Custom icons that we made here at LE
  {
    iconLibPath: './custom-icons',
    namespace: 'le',
  },
];

const customOnly = process.argv.includes('--custom');

if (!customOnly) {
  // https://github.com/material-icons/material-icons
  config.push({
    iconLibPath: './node_modules/@material-icons/svg/svg',
    namespace: 'material-icons',
  });
  // https://github.com/Templarian/MaterialDesign-SVG
  config.push({
    iconLibPath: './node_modules/@mdi/svg/svg',
    namespace: 'mdi',
  });
}

// Clean up directories
if (customOnly) {
  rimraf.sync(path.join(basePathForPrecompiledSvgs, 'le'));
} else {
  rimraf.sync(basePathForPrecompiledSvgs);
  fs.mkdirSync(basePathForPrecompiledSvgs);
}

class LibPrecompiler {
  /**
   * iconLibPath | String | Root path where all icons to be precompiled live
   * namespace | String | Path appended to basePathForPrecompiledSvgs to keep packages separated
   */
  constructor(iconLibPath, namespace) {
    this.iconLibPath = iconLibPath;
    this.namespace = namespace;
  }

  _writePath(appendedPath) {
    const basePath = `${basePathForPrecompiledSvgs}/${this.namespace}`;
    return appendedPath ? `${basePath}/${appendedPath}` : basePath;
  }

  // Returns an optimized, accessible form of the SVG
  _optimizeSvg(file) {
    return svgo.optimize(file).then(optimized => {
      // Apply the Kolibri-specific a11y and other attrs
      const withAttrs = optimized.data.replace('<svg', `<svg ${a11yAttrs}`);
      return withAttrs.includes('viewBox')
        ? withAttrs
        : withAttrs.replace('<svg', `<svg ${viewBox}`);
    });
  }

  // Returns stringified Vue SFC file from a given SVG file
  _generateVueTemplate(svg, originalFile) {
    // Generate a unique name for the icon component which is also a valid tag name.
    // The component name is used to disambiguate between aliases, but is otherwise arbitrary.
    const hash = crypto
      .createHash('md5')
      .update(`${this._writePath()}/${originalFile}`)
      .digest('hex');
    // Generate the component's object
    const scriptObj = JSON.stringify({ name: 'icon-' + hash });
    const script = `export default ${scriptObj}`;
    // Wrap the SVG in a Vue template tag and return it (wrapped in this promise)
    return `<template>\n\n  ${svg}\n\n</template>\n\n\n<script>\n\n  ${script}\n\n</script>`;
  }

  // Check if the file is a file or dir
  _isFile(path) {
    return fs.lstatSync(path).isFile();
  }

  // Given a path that leads to a dir of icons, precompile them
  // No recursion here - just works one level deep (for now and hopefully forever)
  _precompileDir(libIconsPath) {
    const dirPath = libIconsPath.replace(/(.*\/)+/, '');
    fs.mkdirSync(this._writePath(dirPath));
    fs.readdirSync(libIconsPath).forEach(libFilePath => {
      const iconPath = `${libIconsPath}/${libFilePath}`;
      if (iconPath.endsWith('.svg') && this._isFile(iconPath)) {
        // dirPath is the last dir so we get rid of everything up to and including the last '/'
        this._precompileSvg(iconPath, dirPath);
      }
    });
  }

  // libFilePath is where we find the original SVG
  // dirPath is a path we append to where we write and is used when we're reading
  // svg files from a subdirectory of this.iconLibPath so that we maintain the dir structure
  _precompileSvg(libFilePath, dirPath = null) {
    // Read the file and convert it into the Vue SFC string we need
    try {
      const file = fs.readFileSync(libFilePath, 'utf8');
      this._optimizeSvg(file).then(svgFileString => {
        const vueFileString = this._generateVueTemplate(svgFileString, file);
        const writeLocation = this._writePath(dirPath);
        const filename = libFilePath.replace(/(.*\/)+/, '').replace('.svg', '.vue');
        fs.writeFileSync(`${writeLocation}/${filename}`, vueFileString);
      });
    } catch (e) {
      consola.error(`\n\nFailed to optimize and save ${libFilePath}. Error message: ${e}`);
      return;
    }
  }

  // The main entry point
  process() {
    // Ensure our target path exists
    fs.mkdirSync(this._writePath());

    // Read everything in the given dir and process the dir or svg accordingly
    fs.readdirSync(this.iconLibPath).forEach(path => {
      const libIconPath = `${this.iconLibPath}/${path}`;
      if (this._isFile(libIconPath)) {
        if (libIconPath.endsWith('.svg')) {
          this._precompileSvg(libIconPath);
        }
      } else {
        this._precompileDir(libIconPath);
      }
    });
  }
}

// Process every one of the above.
config.forEach(c => {
  new LibPrecompiler(c.iconLibPath, c.namespace).process();
});

consola.success('Precompilation has been successful');
consola.info(`Updates of KDS public icons: \n`);
precompilationDiff.print();
