const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const path = require('path');
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');

// const smp = new SpeedMeasureWebpackPlugin();

const devConfig = {
  devtool: 'eval-source-map',
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './node_modules/highlight.js/styles'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          }
        ],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: { auto: true },
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          },
        ]
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    port: 8081,
    open: true,
    stats: 'errors-warnings',
    historyApiFallback: true,
  }
}

module.exports = merge(baseConfig, devConfig)