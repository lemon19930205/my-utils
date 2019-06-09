const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "eval-source-map",//错误调试，源码映射方式
  entry: __dirname + "/app/main.js",//唯一入口
  output: {
    path: __dirname + "/build",//打包文件存放路径
    filename: "bundle.js" //打包后输出的文件名
  },
  devServer: {
    contentBase: "./public",//本地服务所加载的页面所在目录
    historyApiFallback: true,//不跳转，单页面应用常用
    inline: true, //实时刷新
    hot:true  //热加载
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {loader: "babel-loader"},
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {
            loader: "css-loader",
            options:{
              modules:true,  //指定启用css  modules
              //localIdentName:'[name]_[local]--[hash:base64:5]'  //指定css类名格式
            }
          },
          {loader:"postcss-loader"}
          ]
      }
    ]
  },
  plugins:[
    new webpack.BannerPlugin("开发者：老周"),  //给打包后的代码添加声明
    new htmlWebpackPlugin({
      template:__dirname+"/app/index.tmpl.html"  //new 一个这个插件的实例，并传入相关参数
    }),
    new webpack.HotModuleReplacementPlugin()  //热加载插件
  ]
};