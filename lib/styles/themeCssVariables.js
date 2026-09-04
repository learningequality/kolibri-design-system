import Vue from 'vue';
import { isNuxtServerSideRendering } from '../utils';
import globalThemeState from './globalThemeState';
// side-effect import: loading `theme.js` sets `globalThemeState.tokens`,
// which the `--tokens-*` CSS variables are read from
import './theme';

export const THEME_CSS_VARIABLES_STYLE_ID = 'k-theme-css-variables';

const VALID_CSS_VARIABLE_NAME_PATTERN = /^--[\w-]+$/;
// characters that would end a declaration or rule and corrupt the emitted CSS
const UNSAFE_CSS_VALUE_PATTERN = /[;{}<>]/;

function warnVariableIssue(name, value) {
  // eslint-disable-next-line no-console
  console.warn(`Theme CSS variables issue: unable to emit '${name}' with value '${value}'`);
}

function setVariable(variables, name, value) {
  if (!VALID_CSS_VARIABLE_NAME_PATTERN.test(name) || UNSAFE_CSS_VALUE_PATTERN.test(value)) {
    warnVariableIssue(name, value);
    return;
  }
  variables[name] = value;
}

function formatPathSegment(key) {
  return key.replace(/^v_(\d+)$/, 'v$1');
}

// flattens a color tree into `{ '--prefix-segment': value }`
function collectColorVariables(prefix, value) {
  const variables = {};
  if (typeof value === 'string') {
    setVariable(variables, prefix, value);
  } else if (value && typeof value === 'object') {
    Object.keys(value).forEach(key => {
      Object.assign(
        variables,
        collectColorVariables(`${prefix}-${formatPathSegment(key)}`, value[key]),
      );
    });
  }
  return variables;
}

/** All theme CSS variables of the current `globalThemeState`, as `{ '--name': value }`. */
export function generateThemeCssVariables() {
  return {
    ...collectColorVariables('--palette', globalThemeState.colors.palette),
    ...collectColorVariables('--brand', globalThemeState.colors.brand),
    ...collectColorVariables('--tokens', globalThemeState.tokens),
  };
}

/** Returns `:root` rule, setting all theme CSS variables. */
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
  // never rewrites it with stale CSS; this module is the tag's only writer
  styleTag.removeAttribute('data-n-head');
  styleTag.removeAttribute('data-hid');
  styleTag.textContent = cssText;
}

// non-null also serves as the initialization guard
let watcherVm = null;

/**
 * Emits theme CSS variables to a `<style>` tag in the document head, reusing the
 * server-rendered tag if there is one, and keeps them in sync with the theme.
 */
export default function initThemeCssVariables() {
  if (watcherVm || isNuxtServerSideRendering() || typeof document === 'undefined') {
    return;
  }
  // `globalThemeState` is observable, so the watcher re-runs on any change it derives from
  watcherVm = new Vue();
  watcherVm.$watch(themeCssVariablesText, newText => updateStyleTag(newText), { immediate: true });
}
