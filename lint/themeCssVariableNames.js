/*
 * Derives the set of valid theme CSS variable names (`--tokens-*`, `--brand-*`,
 * and `--palette-*`) from the same source files the runtime theme is built from,
 * so lint rules stay in sync when tokens, brand colors, or palette colors are added.
 */

const fs = require('node:fs');
const path = require('node:path');

const { parse } = require('@babel/parser');

const STYLES_DIR = path.resolve(__dirname, '../lib/styles');

const COLORS_DEFAULT_FILE = path.join(STYLES_DIR, 'colorsDefault.js');
const COLORS_MATERIAL_FILE = path.join(STYLES_DIR, 'colorsMaterial.js');

const THEMED_PREFIXES = ['--tokens-', '--brand-', '--palette-'];

function parseModule(file) {
  return parse(fs.readFileSync(file, 'utf-8'), { sourceType: 'module' });
}

/**
 * Returns the `ObjectExpression` node exported as `name` from `file`, where
 * `name` is either a named export or `default`.
 */
function findExportedObject(file, name) {
  const { program } = parseModule(file);
  for (const node of program.body) {
    if (name === 'default') {
      if (
        node.type === 'ExportDefaultDeclaration' &&
        node.declaration.type === 'ObjectExpression'
      ) {
        return node.declaration;
      }
      continue;
    }
    if (node.type !== 'ExportNamedDeclaration' || !node.declaration) {
      continue;
    }
    for (const declaration of node.declaration.declarations || []) {
      if (
        declaration.id.type === 'Identifier' &&
        declaration.id.name === name &&
        declaration.init &&
        declaration.init.type === 'ObjectExpression'
      ) {
        return declaration.init;
      }
    }
  }
  throw new Error(`Unable to find the '${name}' export in '${file}'`);
}

function propertyKey(property) {
  if (property.key.type === 'Identifier') {
    return property.key.name;
  }
  if (property.key.type === 'StringLiteral') {
    return property.key.value;
  }
  return null;
}

/*
 * Mirrors `formatPathSegment` in `lib/styles/themeCssVariables.js`, which emits
 * version keys as `vN` (e.g. `v_400` -> `v400`).
 */
function formatPathSegment(key) {
  return key.replace(/^v_(\d+)$/, 'v$1');
}

/**
 * Walks a color/token object literal and returns the CSS variable name of every
 * leaf, joining path segments with hyphens, as `themeCssVariables.js` does.
 */
function collectNames(prefix, objectExpression) {
  const names = [];
  for (const property of objectExpression.properties) {
    if (property.type !== 'ObjectProperty') {
      continue;
    }
    const key = propertyKey(property);
    if (key === null) {
      continue;
    }
    const name = `${prefix}-${formatPathSegment(key)}`;
    if (property.value.type === 'ObjectExpression') {
      names.push(...collectNames(name, property.value));
    } else {
      names.push(name);
    }
  }
  return names;
}

let cachedNames = null;

/**
 * Returns a `Set` of every valid theme CSS variable name.
 */
function getThemeCssVariableNames() {
  if (cachedNames) {
    return cachedNames;
  }
  const names = [
    ...collectNames('--palette', findExportedObject(COLORS_MATERIAL_FILE, 'default')),
    ...collectNames('--brand', findExportedObject(COLORS_DEFAULT_FILE, 'defaultBrandColors')),
    ...collectNames('--tokens', findExportedObject(COLORS_DEFAULT_FILE, 'defaultTokenMapping')),
  ];
  if (!names.length) {
    throw new Error('No theme CSS variable names were found in the theme source files');
  }
  cachedNames = new Set(names);
  return cachedNames;
}

function isThemedCustomProperty(name) {
  return THEMED_PREFIXES.some(prefix => name.startsWith(prefix));
}

/**
 * Returns the valid name an invalid one was probably meant to be, or `null`.
 */
function suggestThemeCssVariableName(name) {
  const normalized = name.split('-').map(formatPathSegment).join('-');
  if (normalized !== name && getThemeCssVariableNames().has(normalized)) {
    return normalized;
  }
  return null;
}

module.exports = {
  THEMED_PREFIXES,
  getThemeCssVariableNames,
  isThemedCustomProperty,
  suggestThemeCssVariableName,
};
