//新建一个子线程
var worker = new Worker("child_worker.js");

//主线程向子线程发消息
$("#send").on("click", function (e) {
  //普通数据
  /* worker.postMessage("Hello World"); */

  //对象数据
  /* worker.postMessage({
    method: 'echo',
    args: ['work']
  }); */

  /* worker.postMessage({
    method: "js",
    fileName: "script_data.js"
  }); */

  //引用数据
  var uInt8Arrary = new Uint8Array(new ArrayBuffer(10));
  console.log('uInt8Arrary: ', uInt8Arrary);
  for (let i = 0; i < uInt8Arrary.length; i++) {
    uInt8Arrary[i] = i * 2;
  }
  worker.postMessage(uInt8Arrary)
})

//监听子线程发回的消息
worker.onmessage = function (e) {
  console.log("message " + e.data);

  //doSomething();

}

//监听子线程是否发生错误
worker.onerror = function (e) {
  console.log(["error:line", e.lineno, "in", e.filename, ",", e.message].join(''));

}

function doSomething() {
  //执行任务
  worker.postMessage("work done!");
  //任务完成，关闭子线程(为了节省资源，使用完毕必须关闭子线程)
  worker.terminate();
}