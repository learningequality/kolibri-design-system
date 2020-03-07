
/*
  Do not run this file directly. Instead use:
  yarn run precompile-svgs
*/


const fs = require('fs');

const materialSvgPath = './node_modules/@material-icons/svg/svg';
const styles = ':style="styles"';
const a11yAttrs = `role="presentation" focusable="false"`;
const cssClass = `:class="rtlClass"`;

const baseSVGPath = './lib/KIcon/material-svg';

// Make the base svg directory
fs.mkdirSync(baseSVGPath);

fs.readdirSync(materialSvgPath).forEach(svgDir => {
  // This is the ./svg/NAME_OF_ICON directory
  const localDir = `${baseSVGPath}/${svgDir}`;
  fs.mkdirSync(localDir);

  const materialDir = `${materialSvgPath}/${svgDir}`;
  // Read the SVGs from the material icons package directory
  fs.readdirSync(materialDir).forEach(svgFile => {
    // Read the SVG
    const materialSvgFile = fs.readFileSync(`${materialDir}/${svgFile}`, 'utf8');
    // Apply the Kolibri-specific a11y styles and attrs
    const styledAndAccessibleSvg = materialSvgFile.replace(
      '<svg',
      `<svg ${cssClass} ${styles} ${a11yAttrs}`
    );

    // Uppercase the first letter to conform to Vue filename expectations
    const newFileName = (svgFile.charAt(0).toUpperCase() + svgFile.slice(1)).replace('svg', 'vue');

    // Generate the component's object
    const scriptObj = JSON.stringify({
      name: `${newFileName.replace('.vue', '')}`,
      props: ['rtlClass', 'styles'],
    });

    const script = `export default ${scriptObj}`;

    // Wrap the SVG in a Vue template tag
    const componentText = `<template>\n\n  ${styledAndAccessibleSvg}\n\n</template>\n\n\n<script>\n\n  ${script}\n\n</script>`;

    // Write that file as a vue file in the same place it and filename (sans .svg) it uses in
    // the material-icons package.
    fs.writeFileSync(`${localDir}/${newFileName}`, componentText);
  });
});
