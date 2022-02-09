import Vue from 'vue';
import KThemePlugin from '../lib/KThemePlugin';

KThemePlugin(Vue);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
