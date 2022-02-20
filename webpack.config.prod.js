const path = require('path')
const common = require('./webpack.config.common')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { dirname } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin

const title = 'My Lister'

const srcDir = 'src/'

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  entry: {
    app: path.resolve(__dirname, srcDir + '/app.js')
  },
  resolve: {
    alias: {
      templates: path.resolve(__dirname, 'templates/'),
      extensions: ['.js', '.json', 'css', 'html']
    }
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
      module: true
    }
  },
  devtool: 'source-map',
  stats: {
    children: true,
    errorDetails: true
  }
})