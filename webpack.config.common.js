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
    app: path.resolve(__dirname, srcDir + '/app.js'),
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, srcDir + '/assets/'),
      templates: path.resolve(__dirname, 'templates/'),
      extensions: ['.js', '.json', 'css', 'html'],
    },
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
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/img/[name]-[hash][ext]',
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
      title: title,
      template: './template.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/templates', to: 'templates' }],
    }),
    new LinkTypePlugin({
      '*.css': 'text/css',
    }),
  ],
};
