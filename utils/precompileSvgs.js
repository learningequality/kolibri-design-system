/*
  Do not run this file directly. Instead use:
  yarn run precompile-svgs
*/

const fs = require('fs');
const crypto = require('crypto');
const consola = require('consola');

const SVGO = require('svgo');

var svgo = new SVGO(); // You use this one.

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
  // https://github.com/material-icons/material-icons
  {
    iconLibPath: './node_modules/@material-icons/svg/svg',
    namespace: 'material-icons',
  },
  // https://github.com/Templarian/MaterialDesign-SVG
  {
    iconLibPath: './node_modules/@mdi/svg/svg',
    namespace: 'mdi',
  },
  // Icons that we made here at LE
  {
    iconLibPath: './utils/custom-icon-svgs',
    namespace: 'le',
  },
];

// Before we do anything we need to make the base svg directory. This directory ought not exist.
try {
  fs.mkdirSync(basePathForPrecompiledSvgs);
} catch (e) {
  consola.error(
    `Failed to create base SVG directory. You may need to remove the ${basePathForPrecompiledSvgs} directory.\nError message: ${e}`
  );
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

  writePath(appendedPath) {
    const basePath = `${basePathForPrecompiledSvgs}/${this.namespace}`;
    return appendedPath ? `${basePath}/${appendedPath}` : basePath;
  }

  // Returns stringified Vue SFC file from a given SVG file
  optimizeSvg(file) {
    return svgo.optimize(file).then(r => {
      // Apply the Kolibri-specific a11y and other attrs
      const withAttrs = r.data.replace('<svg', `<svg ${a11yAttrs}`);
      const styledAndAccessibleSvg = withAttrs.includes('viewBox')
        ? withAttrs
        : withAttrs.replace('<svg', `<svg ${viewBox}`);

      // Uppercase the first letter to conform to Vue filename expectations
      //const newFileName = (file.charAt(0).toUpperCase() + file.slice(1)).replace('svg', 'vue');

      // Generate a unique name for the icon component which is also a valid tag name.
      // The component name is used to disambiguate between aliases, but is otherwise arbitrary.
      const hash = crypto
        .createHash('md5')
        .update(`${this.writePath()}/${file}`)
        .digest('hex');
      // Generate the component's object
      const scriptObj = JSON.stringify({ name: 'icon-' + hash });

      const script = `export default ${scriptObj}`;

      // Wrap the SVG in a Vue template tag and return it (wrapped in this promise)
      return `<template>\n\n  ${styledAndAccessibleSvg}\n\n</template>\n\n\n<script>\n\n  ${script}\n\n</script>`;
    });
  }

  // Check if the file is a file or dir
  isFile(path) {
    return fs.lstatSync(path).isFile();
  }

  // Given a path that leads to a dir of icons, precompile them
  // No recursion here - just works one level deep (for now and hopefully forever)
  precompileDir(libIconsPath) {
    const dirPath = libIconsPath.replace(/(.*\/)+/, '');
    fs.mkdirSync(this.writePath(dirPath));
    fs.readdirSync(libIconsPath).forEach(libFilePath => {
      const iconPath = `${libIconsPath}/${libFilePath}`;
      if (this.isFile(iconPath)) {
        // dirPath is the last dir so we get rid of everything up to and including the last '/'
        this.precompileSvg(iconPath, dirPath);
      }
    });
  }

  // libFilePath is where we find the original SVG
  // dirPath is a path we append to where we write and is used when we're reading
  // svg files from a subdirectory of this.iconLibPath so that we maintain the dir structure
  precompileSvg(libFilePath, dirPath = null) {
    // Read the file and convert it into the Vue SFC string we need
    try {
      this.optimizeSvg(fs.readFileSync(libFilePath, 'utf8')).then(vueFileString => {
        const writeLocation = this.writePath(dirPath);

        const filename = libFilePath.replace(/(.*\/)+/, '').replace('.svg', '.vue');

        fs.writeFileSync(`${writeLocation}/${filename}`, vueFileString);
      });
    } catch (e) {
      consola.error(`\n\nFailed to optimize and save ${libFilePath}. Error message: ${e}`);
      return;
    }
  }

  // The entry point for the class. If ES6 supported it every other method in this class would be private.
  process() {
    // Ensure our target path exists
    fs.mkdirSync(this.writePath());

    // Read everything in the given dir and process the dir or svg accordingly
    fs.readdirSync(this.iconLibPath).forEach(path => {
      const libIconPath = `${this.iconLibPath}/${path}`;
      this.isFile(libIconPath) ? this.precompileSvg(libIconPath) : this.precompileDir(libIconPath);
    });
  }
}

// Process every one of the above.
config.forEach(c => {
  new LibPrecompiler(c.iconLibPath, c.namespace).process();
});
