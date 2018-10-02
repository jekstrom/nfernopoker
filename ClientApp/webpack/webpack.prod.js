var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '/[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: ENV
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  optimization: {
    noEmitOnErrors: true // NoEmitOnErrorsPlugin
  }
});
