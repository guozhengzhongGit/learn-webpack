const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const path = require('path');

const devConfig = {
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8081,
    open: true,
    stats: 'errors-warnings',
  }
}

module.exports = merge(baseConfig, devConfig)