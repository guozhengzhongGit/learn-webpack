const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.config');

const prodConfig = {
  mode: 'production',
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          test: /(react|react-dom|lodash)/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  }
}

module.exports = merge(baseConfig, prodConfig)