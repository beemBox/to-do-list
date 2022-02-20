const path = require('path');
const common = require('./webpack.config.common');
const { merge } = require('webpack-merge');
const { dirname } = require('path');

const title = 'My Lister';

const srcDir = 'src/';

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: true,
    },
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  stats: {
    children: true,
    errorDetails: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    client: {
      overlay: true,
    },
  },
});
