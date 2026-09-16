import Vue from 'vue';

import { defaultBrandColors, defaultTokenMapping } from './colorsDefault';
import materialColors from './colorsMaterial';

const globalThemeState = Vue.observable({
  inputModality: null, // track whether the user is navigating with the keyboard or not
  mediaType: null, // track media type
  colors: {
    palette: materialColors,
    brand: defaultBrandColors,
  },
  tokenMapping: defaultTokenMapping,
  // resolved tokens from `theme.js`, kept here so that reading them registers a
  // reactive dependency that fires when tokens are added at runtime
  tokens: {},
});

export default globalThemeState;
