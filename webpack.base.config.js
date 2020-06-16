const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: devMode ? 'bundle.js' : '[name]_[chunkhash:8].bundle.js',
    filename: devMode ? 'bundle.js' : '[name]_[chunkhash:8].bundle.js',
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
    new webpack.DefinePlugin({
      TWO: '1+1',
      'typeof window': JSON.stringify('string'),
      'devMode': JSON.stringify(process.env.NODE_ENV !== 'production'),
    }),
    new HardSourceWebpackPlugin()
  ],
  stats: 'errors-warnings'
}