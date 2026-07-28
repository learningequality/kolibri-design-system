import Vue from 'vue';
import VueIntl from 'vue-intl';
import KThemePlugin from '~~/lib/KThemePlugin';
import trackInputModality from '~~/lib/styles/trackInputModality';
import {
  themeCssVariablesText,
  THEME_CSS_VARIABLES_STYLE_ID,
} from '~~/lib/styles/themeCssVariables';

// `KThemePlugin` dependency needed for outline style when
// navigating between KDS components with keyboard
// See `KThemePlugin` `$coreOutline` and `globalThemeState.inputModality`
trackInputModality({ disableFocusRingByDefault: false });

Vue.use(KThemePlugin);
Vue.use(VueIntl);

export default function ({ app }) {
  // SSR only: emit theme CSS variables into a head `<style>` tag so the first
  // paint is themed. On the client, the `KThemePlugin` watcher takes over the
  // tag and strips vue-meta's marker attributes so vue-meta never overwrites
  // it with stale CSS.
  if (process.server) {
    app.head.style = app.head.style || [];
    if (!app.head.style.some(style => style.id === THEME_CSS_VARIABLES_STYLE_ID)) {
      app.head.style.push({
        hid: THEME_CSS_VARIABLES_STYLE_ID,
        id: THEME_CSS_VARIABLES_STYLE_ID,
        type: 'text/css',
        cssText: themeCssVariablesText(),
      });
    }
  }
}
