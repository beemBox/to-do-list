const path = require('path');
const common = require('./webpack.config.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dirname } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin')
  .HtmlWebpackLinkTypePlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const title = 'My Lister';

const srcDir = 'src/';

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  resolve: {
    alias: {
      templates: path.resolve(__dirname, 'templates/'),
      extensions: ['.js', '.json'],
    },
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-[contenthash].js',
    libraryTarget: 'umd',
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css',
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: false,
});
