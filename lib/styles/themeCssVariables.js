import Vue from 'vue';
import { isNuxtServerSideRendering } from '../utils';
import globalThemeState from './globalThemeState';

export const THEME_CSS_VARIABLES_STYLE_ID = 'k-theme-css-variables';

// characters that would end a declaration or rule and corrupt the emitted CSS
const UNSAFE_CSS_VALUE_PATTERN = /[;{}<>]/;

function warnVariableIssue(name, value) {
  // eslint-disable-next-line no-console
  console.warn(`Theme CSS variables issue: unable to emit '${name}' with value '${value}'`);
}

function setVariable(variables, name, value) {
  if (UNSAFE_CSS_VALUE_PATTERN.test(value)) {
    warnVariableIssue(name, value);
    return;
  }
  variables[name] = value;
}

function formatPathSegment(key) {
  return key.replace(/^v_(\d+)$/, 'v$1');
}

function collectColorVariables(prefix, value, variables) {
  if (typeof value === 'string') {
    setVariable(variables, prefix, value);
  } else if (value && typeof value === 'object') {
    Object.keys(value).forEach(key => {
      collectColorVariables(`${prefix}-${formatPathSegment(key)}`, value[key], variables);
    });
  }
}

// Intentionally duplicates resolution from `theme.js`: its resolved tokens
// object is non-observable, so reading it here would not register the
// reactive dependencies the watcher relies on.
function resolveTokenValue(mapString) {
  // a value without dots is a CSS color value, not a path
  if (mapString.indexOf('.') === -1) {
    return mapString;
  }
  const refs = mapString.split('.');
  let obj = globalThemeState.colors;
  while (refs.length && obj) {
    obj = obj[refs.shift()];
  }
  return typeof obj === 'string' ? obj : null;
}

/**
 * Returns an object mapping CSS variable names to color values, from
 * the current `globalThemeState`.
 */
export function generateThemeCssVariables() {
  const variables = {};
  collectColorVariables('--palette', globalThemeState.colors.palette, variables);
  collectColorVariables('--brand', globalThemeState.colors.brand, variables);
  Object.keys(globalThemeState.tokenMapping).forEach(tokenName => {
    const name = `--theme-${tokenName}`;
    const value = resolveTokenValue(globalThemeState.tokenMapping[tokenName]);
    if (value === null) {
      warnVariableIssue(name, globalThemeState.tokenMapping[tokenName]);
    } else {
      setVariable(variables, name, value);
    }
  });
  return variables;
}

/**
 * Returns a `:root` CSS rule, setting all theme CSS variables.
 */
export function themeCssVariablesText() {
  const variables = generateThemeCssVariables();
  const declarations = Object.keys(variables).map(name => `  ${name}: ${variables[name]};`);
  return `:root {\n${declarations.join('\n')}\n}`;
}

function updateStyleTag(cssText) {
  let styleTag = document.getElementById(THEME_CSS_VARIABLES_STYLE_ID);
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = THEME_CSS_VARIABLES_STYLE_ID;
    document.head.appendChild(styleTag);
  }
  // Strip vue-meta's marker attributes from an SSR-rendered tag so vue-meta
  // never rewrites it with stale CSS; this module is the tag's only writer.
  styleTag.removeAttribute('data-n-head');
  styleTag.removeAttribute('data-hid');
  styleTag.textContent = cssText;
}

// non-null also serves as the initialization guard
let watcherVm = null;

/**
 * Emits theme CSS variables to a `<style>` tag in the document head, reusing
 * the tag written during server-side rendering if there is one, and keeps them
 * in sync with `globalThemeState`.
 */
export default function initThemeCssVariables() {
  if (watcherVm || isNuxtServerSideRendering() || typeof document === 'undefined') {
    return;
  }
  updateStyleTag(themeCssVariablesText());
  // `globalThemeState` is a Vue observable, so the watcher re-runs whenever
  // any value the CSS text is derived from changes
  watcherVm = new Vue();
  watcherVm.$watch(themeCssVariablesText, newText => updateStyleTag(newText));
}
