export default {
  mode: 'universal',
  head: {
    title: 'Kolibri Design System', // default
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/kolibri.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Source+Code+Pro:wght@400&display=swap&subset=cyrillic,cyrillic-ext,devanagari,greek,greek-ext,latin-ext,vietnamese',
      },
    ],
  },
  srcDir: './docs/',
  plugins: ['~/plugins/load-common-components.js', '~/plugins/load-lib-components.js'],
  css: ['normalize.css/normalize.css', '~/assets/main'],
  modulesDir: ['node_modules', 'docs'], // allow custom DocsShowCode loader to be found
  build: {
    extractCSS: true,
    optimization: {
      // this appears to be necessary to prevent a flash of unstyled text
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue|scss)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    extend(config) {
      // handles <mat-svg/>, <ion-svg/>, <iconic-svg/>, and <file-svg/> svg inlining
      config.module.rules.push({
        test: /\.vue$/,
        enforce: 'pre',
        loader: 'svg-icon-inline-loader',
        exclude: /node_modules/,
      });
      // handles escaping HTML inside <DocsShowCode> slots
      config.module.rules.push({
        test: /\.vue$/,
        loader: 'common/DocsShowCode/webpack-loader.js',
        exclude: /node_modules/,
      });
      // used for glossary
      config.module.rules.push({
        test: /\.tbx$/,
        loader: 'xml-loader',
      });
      // allow this file to be displayed
      config.module.rules.push({
        test: /rstIconReplacements.txt/,
        loader: 'raw-loader',
      });
      config.devtool = 'source-map';
    },
    cssSourceMap: true,
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
};
