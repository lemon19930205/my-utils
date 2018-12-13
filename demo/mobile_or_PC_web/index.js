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
      if (result) {
        var a = result.s;
        var list = "";
        for (var i in a) {
          var l = a[i];
          list += "<li>" + l + "</li>";
        }
        $("#searchData").show().html(list);
      }
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

//模糊搜索选中
$("#searchData").on("click", function (e) {
  var ele = $(e.target);
  if (ele.is('li')) {
    $("#searchInput").val(ele.text());
    $(this).hide();
    searchFun();
  }
})

//搜索事件
$("#searchButton").on("click", function (e) {
  searchFun();
})

function searchFun(param) {
  //左侧mobile页
  var url = "https://www.baidu.com/s?wd=" + $("#searchInput").val();
  $("#mobile_view").attr("src", url);

  //右侧PC页
  $("#PC").html('<iframe id="PC_view" src="http://127.0.0.1:9999/demo/mobile_or_PC_web/PC_view.html?wd='+encodeURI($("#searchInput").val())+'" frameborder="0"></iframe>')

}