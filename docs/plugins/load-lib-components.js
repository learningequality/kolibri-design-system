import Vue from 'vue';
import KThemePlugin from '~~/lib/KThemePlugin';
import trackInputModality from '~~/lib/styles/trackInputModality';

// `KThemePlugin` dependency needed for outline style when
// navigating between KDS components with keyboard
// See `KThemePlugin` `$coreOutline` and `globalThemeState.inputModality`
trackInputModality({ disableFocusRingByDefault: false });

Vue.use(KThemePlugin);
