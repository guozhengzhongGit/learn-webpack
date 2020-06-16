const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.config');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();
const isAnalyzer = process.env.analyzer === 'true';

const plugins = [
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano')
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:6].css',
    chunkFilename: '[name].[contenthash:6].css',
  }),
]

const prodPlugins = isAnalyzer ? [new BundleAnalyzerPlugin(), ...plugins] : plugins

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './node_modules/highlight.js/styles'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
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
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(react|react-dom|react-router|marked)/,
          name: 'vendors',
          chunks: 'all',
        },
        // vendors: {
        //   test: /[\\/]node_modules[\\/](highlight.js)[\\/]/,
        //   name: 'vendors',
        //   chunks: 'all',
        // },
      }
    },
    minimize: true,
    minimizer: [new TerserPlugin(
      {
        parallel: true,
        cache: true,
      }
    )],
  },
  plugins: prodPlugins,
  stats: 'normal',
  externals: {
    // marked: 'marked',
    'highlight.js': 'hljs'
  },
  devtool: 'nosources-source-map',
}

module.exports = smp.wrap(merge(baseConfig, prodConfig))