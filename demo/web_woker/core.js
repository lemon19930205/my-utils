//在子线程child_worker中新建的子线程

//获取计算起点
var start;
onmessage = getStart;

function getStart(e) {
  start = e.data;
  onmessage = getEnd;
}

//获取计算终点
var end;
onmessage = getEnd;

function getEnd(e) {
  end = e.data;
  onmessage = null;

}

//计算处理
function work() {
  var result = 0;
  for (var start = 0; i < end; i++) {
    //模拟计算
    result += 1;
  }
  postMessage(result);
  close();
}