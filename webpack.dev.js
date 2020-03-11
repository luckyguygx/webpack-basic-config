const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base.js');
const { smart } = require('webpack-merge');

const pathResolve = (targetPath) => path.resolve(__dirname, targetPath);

module.exports = smart(base, {
  mode: 'development',
  output: {
    filename: 'static/js/[name].[hash:7].js'
  },
  devServer: {
    contentBase: pathResolve('dist'),
    port: '8080',
    inline: true,
    historyApiFallback: true,
    // hot: true  //webpack 3.0以上的版本，热更新中要去掉hot:true选项并且命令启动要取消--hot参数 （实测确实是这样）
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
