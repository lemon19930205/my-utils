//对请求的二次封装

export default function (api,arg,winCallback,loseCallback) {
  //封装好的请求方法

  //api->请求接口函数
  //arg->参数(数组)
  //winCallback->请求成功的回调
  //loseCallback->请求失败的回调(包括请求操作不成功和catch)

  api(...arg).then(res=>{
    if(res.data.status===0){
      winCallback(res)
    }else {
      loseCallback(res)
    }
  }).catch(err=>{
    loseCallback(err)
  })
}