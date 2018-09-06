const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "../public"),
    publicPath: '/',
    host: '127.0.0.1',
    port: '8888',
    overlay: true,
    inline: true,
    compress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});