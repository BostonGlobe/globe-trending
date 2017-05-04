const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './server/styles.js',
  output: {
    path: path.join(__dirname, 'components'),
    filename: 'WEBPACKALLTHETHINGS-F-IT.js'
  },
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          compact: true
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'index.css'
    }),
    new OptimizeCssAssetsPlugin(),
  ],
  resolve: {
    modules: [
      path.resolve('./node_modules')
    ]
  }
};
