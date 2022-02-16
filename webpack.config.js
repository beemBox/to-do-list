const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { dirname } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin

const title = 'My Lister'

const srcDir = 'src/'

module.exports = {
  entry: {
    app: path.resolve(__dirname, srcDir + '/app.js')
  },
  resolve: {
    alias: {
      templates: path.resolve(__dirname, 'templates/'),
      extensions: ['.js', '.json']
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
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
        exclude: /(node_modules|assets\/vendors)*/,
        include: /class/,
        use: 'babel-loader',
      },
      {
        test: /\.(html)$/i,
        include: /templates/,
        use: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: 'dist/'
          }
        }, 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'javascript/auto',
        loader: 'file-loader',
        type: 'javascript/auto',
        options: {
          name: '/assets/img/[name][ext]'
        }
      },
      {
        test: /\.(ttf)$/i,
        type: 'javascript/auto',
        loader: 'file-loader',
        type: 'javascript/auto',
        options: {
          name: '/assets/fonts/[name][ext]'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      title: title
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
        { from: "src/templates", to: "templates" },
      ],
    }),
    new LinkTypePlugin({
      '*.css': 'text/css'
    })
  ],
  mode: 'development',
  devtool: 'source-map',
  stats: {
    children: true,
    errorDetails: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    client: {
      overlay: true
    }
  }
}