const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcDir = 'src'
const distDir = 'dist'

module.exports = {
  entry: path.resolve(__dirname, srcDir + '/app.js'),
  output: {
    path: path.resolve(__dirname, distDir),
    filename: 'app.js',
    library: '$',
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
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    })
  ],
  mode: 'development',
}