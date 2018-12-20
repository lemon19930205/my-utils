//监听message事件
self.addEventListener("message", function (e) {
  //console.log("self data",e.data);

  var data = e.data;
  switch (data.method) {
    case "js":
      importScripts(data.fileName);
      break;
    default:
      self.postMessage("you said:" + e.data);
  }
}, false)

//worker内部关闭自身(为了节省资源，使用完毕必须关闭子线程)
//self.close();