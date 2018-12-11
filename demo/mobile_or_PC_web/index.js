//百度模糊搜索提示
$("#searchInput").on("keyup", function (e) {
  $.ajax({
    type: "get",
    url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
    data: {
      wd: $(this).val(),
      cb: "helloword"
    },
    dataType: "jsonp",
    jsonpCallback: "helloword",
    success: function (result) {
      /*返回成功之后可以在开发者工具里的Console打印看一下*/
      console.log(result);
      /*将获取的数据整理后返回到页面*/
      var a = result.s;
      var list = "";
      for (var i in a) {
        var l = a[i];
        list += "<li>" + l + "</li>";
      }
      $("#searchData").html(list);
    },
    /*跨域失败的时候返回的数据*/
    error: function () {
      console.log("error");
    }
  });
})

function helloword(param) {
console.log(param);

}

//s