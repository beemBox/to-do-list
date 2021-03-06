const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dirname } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin')
  .HtmlWebpackLinkTypePlugin;

const title = 'My Lister - ToDo List';

const srcDir = 'src/';

module.exports = {
  entry: {
    vendor: path.resolve(__dirname, srcDir + '/vendor.js'),
    app: path.resolve(__dirname, srcDir + '/app.js'),
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, srcDir + '/assets/'),
      templates: path.resolve(__dirname, 'templates/'),
    },
    extensions: ['.js', '.json', '.mjs', '*'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|assets\/vendors)*/,
        include: /class/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', 'stage-0'],
            plugins: [
              ['@babel/plugin-transform-runtime', { 'polyfill': false }],
              '@babel/plugin-proposal-dynamic-import',
              ['@babel/plugin-proposal-decorators', { 'legacy': true }],
              ['@babel/plugin-proposal-class-properties', { 'loose': true }],
              'wildcard',
              'wildcard-import'
            ]
          }
        }],
      },
      {
        test: /\.(html)$/i,
        include: /templates/,
        use: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/img/[name].[hash][ext]',
        },
      },
      {
        test: /\.(ico)$/i,
        type: 'asset',
        generator: {
          filename: '[name].[hash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      favicon: './src/assets/favicon/favicon.ico',
      template: './template.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/templates', to: 'templates' }],
    }),
    new LinkTypePlugin({
      '*.css': 'text/css',
    })
  ],
};
