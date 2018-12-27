//监听message事件
//或 onmessage
self.addEventListener("message", function (e) {
  //console.log("self data",e.data);

  /* var data = e.data;
  switch (data.method) {
    case "js":
      importScripts(data.fileName);
      break;
    default:
      self.postMessage("you said:" + e.data);
  } */

  var uInt8Array = e.data;
  console.log('uInt8Array: ', uInt8Array.toString());

}, false)

//worker内部关闭自身(为了节省资源，使用完毕必须关闭子线程)
//self.close();

//--------------------------------------------------在子线程内部再新建子线程(目前只有firefox支持)

//settings
var num_workers = 10;
var items_per_worker = 100000;

//start the workers
var result = 0;
var pending_worker = num_workers;
for (var i = 0; i < num_workers.length; i++) {
  //新建10个core子线程
  var worker = new Worker("core.js");
  //依次向这10个core子线程发送消息，告知计算起点和终点
  worker.postMessage(i * item_per_worker);
  worker.postMessage((i + 1) * item_per_worker);
  worker.onmessage = storeResult;
}

//整合core子线程返回的数据结果,并返回给主线程
function storeResult(e) {
  result += e.data;
  pending_worker -= 1;
  if (pending_worker <= 0) {
    //finished!
    postMessage(result);
  }
}