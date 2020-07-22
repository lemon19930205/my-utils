module.exports = {
  devServer: {
    port: 8888,
    proxy: { //配置跨域处理，只有一个代理
      '/local': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
}