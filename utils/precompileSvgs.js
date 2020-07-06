/*
  Do not run this file directly. Instead use:
  yarn run precompile-svgs
*/

const fs = require('fs');
const crypto = require('crypto');
const SVGO = require('svgo');

const materialSvgPath = './node_modules/@material-icons/svg/svg';
const a11yAttrs = `role="presentation" focusable="false"`;
const viewBox = `viewBox="0 0 24 24"`;

const baseSVGPath = './lib/KIcon/material-svg';

// Make the base svg directory
fs.mkdirSync(baseSVGPath );

fs.readdirSync(materialSvgPath).forEach(svgDir => {
  // This is the ./svg/NAME_OF_ICON directory
  const localDir = `${baseSVGPath}/${svgDir}`;
  fs.mkdirSync(localDir);

  const materialDir = `${materialSvgPath}/${svgDir}`;
  // Read the SVGs from the material icons package directory
  fs.readdirSync(materialDir).forEach(svgFile => {
    // Read the SVG
    const materialSvgFile = fs.readFileSync(`${materialDir}/${svgFile}`, 'utf8');

    var svgo = new SVGO();
    svgo.optimize(materialSvgFile).then(r => {
      // Apply the Kolibri-specific a11y and other attrs
      const styledAndAccessibleSvg = r.data.replace('<svg', `<svg ${a11yAttrs} ${viewBox}`);

      // Uppercase the first letter to conform to Vue filename expectations
      const newFileName = (svgFile.charAt(0).toUpperCase() + svgFile.slice(1)).replace(
        'svg',
        'vue'
      );

      // Generate a unique name for the icon component which is also a valid tag name.
      // The component name is used to disambiguate between aliases, but is otherwise arbitrary.
      const hash = crypto
        .createHash('md5')
        .update(`${materialDir}/${svgFile}`)
        .digest('hex');
      // Generate the component's object
      const scriptObj = JSON.stringify({ name: 'icon-' + hash });

      const script = `export default ${scriptObj}`;

      // Wrap the SVG in a Vue template tag
      const componentText = `<template>\n\n  ${styledAndAccessibleSvg}\n\n</template>\n\n\n<script>\n\n  ${script}\n\n</script>`;

      // Write that file as a vue file in the same place it and filename (sans .svg) it uses in
      // the material-icons package.
      fs.writeFileSync(`${localDir}/${newFileName}`, componentText);
    });
  });
});
