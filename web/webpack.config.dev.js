const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    'regenerator-runtime/runtime',
    'core-js/features/symbol',
    'core-js/features/promise',
    'core-js/features/object/keys',
    'core-js/features/array/keys',
    'core-js/features/array/find',
    'core-js/features/array/find-index',
    'core-js/features/array/includes',
    'core-js/features/object/assign',
    'core-js/features/url-search-params',
    'whatwg-fetch',
    './src/index',
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    publicPath: '/build/',
    filename: 'default.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: '../index.html',
    }),
    new FaviconsWebpackPlugin('./src/assets/images/favicon/favicon.png'),
    new CopyPlugin([
      {
        from: './src/assets/images/',
        to: 'assets',
      },
      {
        from: './src/geo',
        to: 'assets/geo',
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(png|jpg|woff|woff2|svg|eot|ttf|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
};
