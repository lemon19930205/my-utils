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
  /* var uInt8Arrary = new Uint8Array(new ArrayBuffer(10));
  console.log('uInt8Arrary: ', uInt8Arrary);
  for (let i = 0; i < uInt8Arrary.length; i++) {
    uInt8Arrary[i] = i * 2;
  }
  worker.postMessage(uInt8Arrary) */

  //Transferable Objects 格式
  //把二进制数据直接转移给主线程，防止出现多个线程同事修改数据的情况
  //worker.postMessage(ArrayBuffer,[ArrayBuffer])
  var ab = new ArrayBuffer(1);
  worker.postMessage(ab, [ab]);
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

//--------------------------------------------------------------------获取同页面的web worker

//先把当前页面脚本转化为二进制对象
var blob = new Blob([document.querySelector("#worker").textContent]);
//为二进制对象生成url
var url = window.URL.createObjectURL(blob);
//worker加载这个url
var worker2 = new worker(url);

worker2.onmessage = function (e) {
  //worker.postMessage("Hello World");
}

//-------------------------------------------------------------------------worker线程完成轮询

//当浏览器需要轮询服务状态时，将这个工作放在worker中，当发生改变时再通知主线程

//封装一个直接在当前js中，动态生成worker的方法
function createWorker(f) {
  //二进制化一段字符串化的自执行函数
  var blob = new Blob(['(' + f.toString() + ')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new worker(url);
  return worker;
}

//创建轮询子线程
var pollingWorker = createWorker(function (e) {
  //缓存
  var cache;
  //数据比对逻辑
  function compare(newVal, oldVal) {};
  //轮询
  setInterval(function () {
    fetch("/my-api-endpoint").then(function (res) {
      var data = res.json();
      if (!compare(data, cache)) {
        cache = data;
        //对比发生变化，通知主线程
        self.postMessage(data);
      }
    })
  }, 1000);
});

pollingWorker.onmessage = function (e) {
  //render data
}

//初始化子线程数据
pollingWorker.postMessage("init");

//---------------------------------------------------------------------------------worker新建worker

//在子线程内部再新建一个子线程(目前只有firefox支持)
//var worker = new Worker("child_worker.js");
//监听子线程消息，并在页面呈现
worker.onmessage = function (e) {
  document.getElementById("result").textContent = e.data;
}