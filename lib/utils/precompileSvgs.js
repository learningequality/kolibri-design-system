const fs = require('fs');
const espree = require('espree');
const escodegen = require('escodegen');
const VueTemplateCompiler = require('vue-template-compiler');

const materialSvgPath = "./node_modules/@material-icons/svg/svg";
const svgFilePrefix = "data:image/svg+xml;base64,";
const styles = ":style=style";
const a11yAttrs = `role="presentation" focusable="false"`;
const cssClass = `:class="rtlClass"`;
const script = "export default { props: ['rtlClass', 'style'] }"

const baseSVGPath = "lib/material-svg";

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
        const styledAndAccessibleSvg = materialSvgFile.replace("<svg", `<svg ${cssClass} ${styles} ${a11yAttrs}`);

        // Wrap the SVG in a Vue template tag
        const componentText = `<template>${styledAndAccessibleSvg}</template><script>${script}</script>`

        // Write that file as a vue file in the same place it and filename (sans .svg) it uses in
        // the material-icons package.
        const newFileName = svgFile.replace('svg', 'vue');
        fs.writeFileSync(`${localDir}/${newFileName}`, componentText);
    });
});
