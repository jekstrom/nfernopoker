var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    hot: true,
    https: true,
    historyApiFallback: true,
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
      template: path.resolve(__dirname, '../public/index.html')
    })
  ],
  optimization: {
    namedModules: true, // NamedModulesPlugin()
    noEmitOnErrors: true // NoEmitOnErrorsPlugin
  }
});
