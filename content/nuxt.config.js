var path = require('path');

process.env.DEBUG = 'nuxt:*'

export default {
  debug: true,
  mode: 'universal',
  head: {
    title: 'Kolibri Design System',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/kolibri.ico' }],
  },
  // plugins: [{
  //   src: '~/plugins/load-kolibri-components',
  //   mode: 'client',
  // }],
  // build: {
  //   extend(config) {
  //     config.resolveLoader.alias = {
  //       'vue-doc': path.join(__dirname, './vue-doc-loader'),
  //     };
  //   }
  // }
};
