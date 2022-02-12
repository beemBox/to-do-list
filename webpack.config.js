const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FileLoader = require('file-loader')

const title = 'My Lister'

const srcDir = 'src/'

module.exports = {
  entry: {
    app: path.resolve(__dirname, srcDir + '/app.js'),
  },
  resolve: {
    alias: {
      'mini-components': path.resolve(__dirname, '@mini-core/components/'),
      templates: path.resolve(__dirname, srcDir + 'templates/'),
      extensions: ['.js', '.json']
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
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
        test: /\.(js)$/,
        type: 'asset/resource',
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/vendors/'
          }
        }]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/img/'
          }
        }]
      },
      {
        test: /\.(ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      title: title
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css'
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