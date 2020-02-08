// ./styleguide.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const cssLoader = {
  loader: 'css-loader',
  options: { sourceMap: true },
};

module.exports = {
  components: 'lib/Hello.vue',
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          enforce: 'pre',
          loader: 'svg-icon-inline-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.scss$/,
          loader: ['style-loader', cssLoader, 'sass-loader'],
        },
        {
          test: /\.css$/,
          loader: ['style-loader', cssLoader],
        },
      ],
    },
    plugins: [new VueLoaderPlugin()],
  },
};
