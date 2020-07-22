const path = require("path")

module.exports = {
  //入口文件
  entry:'./src/app.js',

  //输出文件
  output:{
    filename:'bulid.js',
    path:__dirname+'/src/dist/'
  },

  //模块
  module:{
    rules:[
      {
        test:/\.js$/,
        include:[
          path.resolve(__dirname,'src')
        ],
        exclude:/node_modules/,
        use:['babel-loader']
      }
    ]
  }
}