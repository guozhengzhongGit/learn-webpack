const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const prodConfig = {
  mode: 'production',
  optimization: {
    splitChunks: {
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