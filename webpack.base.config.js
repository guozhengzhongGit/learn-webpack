const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: {
    index: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: devMode ? '[name].bundle.js' : '[name]_[chunkhash:8].bundle.js',
    filename: devMode ? '[name].bundle.js' : '[name]_[chunkhash:8].bundle.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, './node_modules')],
    alias: {
      src: path.resolve(__dirname, './src'),
      assets: path.resolve(__dirname, './assets'),
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
    },
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        include: path.resolve(__dirname, './src'),
        use: [
          {
            loader: 'thread-loader',
          },
          {
            loader: 'babel-loader?cacheDirectory=true',
          }
        ]
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
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
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './template/index.ejs'),
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      TWO: '1+1',
      'typeof window': JSON.stringify('string'),
    }),
    new HardSourceWebpackPlugin()
  ],
  stats: 'errors-warnings'
}