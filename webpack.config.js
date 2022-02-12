const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcDir = 'src'

module.exports = {
  entry: path.resolve(__dirname, srcDir + '/app.js'),
  resolve: {
    alias: {
      'mini-core': path.resolve(__dirname, '@mini-core/components/'),
      templates: path.resolve(__dirname, 'src/templates/'),
      extensions: ['.js', '.json']
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/',
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
      {
        test: /\.css/i,
        use: ['style-loader', 'css-loader'],
      }
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
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
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    client: {
      overlay: true
    }
  }
}