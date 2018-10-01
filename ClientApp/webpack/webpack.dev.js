var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
process.env.PUBLIC_URL = "/";

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    hot: true,
    https: true,
    historyApiFallback: true,
    host: "127.0.0.1",
    noInfo: false,
    publicPath: "/"
  },
  output: {
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      requestTimeout: 20000
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      filename: 'index.html',
      publicUrl: '/',
      template: path.resolve(__dirname, '../public/index.html')
    })
  ],
  optimization: {
    namedModules: true, // NamedModulesPlugin()
    noEmitOnErrors: true // NoEmitOnErrorsPlugin
  }
});
