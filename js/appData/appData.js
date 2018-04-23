//框架WebViewJavascriptBridge

//注意：如果callback用了ES6箭头函数，那么函数中的其他函数也必须用箭头函数
/*这段代码是固定的，必须要放到js中*/
export default function setupWebViewJavascriptBridge(callback) {

//Android使用
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady'
      , function() {
        callback(WebViewJavascriptBridge)
      },
      false
    );
  }


//iOS使用
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  //WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}


function callback(bridge) {

//原生调用JS
//在 setupWebViewJavascriptBridge 中注册原生调用的js
//注册原生调起方法
//参数1： buttonjs 注册flag 供原生使用，要和原生统一
//参数2： data  是原生传给js 的数据
//参数3： responseCallback 是js 的回调，可以通过该方法给原生传数据

  /*bridge.registerHandler("buttonjs", function (data, responseCallback) {

    document.getElementById("show").innerHTML = "buuton js" + data;
    responseCallback("button js callback");
  });*/


//JS调用原生
//该方法应放在setupWebViewJavascriptBridge 中进行绑定
//参数1： pay 注册flag 供原生使用，要和原生统一
//参数2： 是调起原生时向原生传递的参数
//参数3： 原生调用回调返回的数据

  /*bridge.callHandler('getBlogNameFromObjC', data, function (resp) {
      document.getElementById("show").innerHTML = "payInterface" + resp;
    })*/


  //在Android中必须初始化数据
  //!!!!!!!   init必须放在函数最下面   ！！！！！！
  //如果不加init，Android不能接收到数据；如果不放最下边，IOS不能接收到数据
  /*bridge.init((data, responseCallback)=>{
   this.isDialog(data);
   let responseData = '默认接收收到来自Java的数据，回传数据给你';
   responseCallback(responseData);
   });*/
}




