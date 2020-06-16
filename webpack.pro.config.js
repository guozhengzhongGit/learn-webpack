const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();
const isAnalyzer = process.env.analyzer === 'true';

const plugins = [
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano')
  }),
]

const prodPlugins = isAnalyzer ? [new BundleAnalyzerPlugin(), ...plugins] : plugins

const prodConfig = {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(react|react-dom|react-router|lodash)/,
          name: 'vendors',
          chunks: 'all',
        }
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
}

module.exports = smp.wrap(merge(baseConfig, prodConfig))