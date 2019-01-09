let obj1 = {
    a: 1,
    b: 2
  },
  obj2 = {
    c: 3,
    d: 4
  };

let obj = $.extend(obj1, obj2);


//trigger 事件
$("#box").on("click", function (e) {
  console.log('jqclick e: ', e);
})

var box_ele = document.getElementById("box");
box_ele.onclick = function (e) {
  console.log('jsclick e: ', e);
}

setTimeout(function (e) {
  $("#box").trigger("click");
}, 3000);