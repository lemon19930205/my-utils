# 如何防止 XSS 攻击

### 目录

- [XSS 攻击的介绍](#XSS-攻击的介绍)

- [XSS 攻击的分类](#XSS-攻击的分类)

- [XSS 攻击的预防和检测](#XSS-攻击的预防和检测)

- [XSS 攻击的总结](#XSS-攻击的总结)

- [XSS 攻击案例](#XSS-攻击案例)

> ## 阅读理解(判断)
>
> XSS 防范是后端的责任，后端应该在所有用户提交数据的接口对敏感字符转义才能进行下一步操作
>
> 错，
>
> 插入页面的数据都要通过一个通用的敏感字符过滤函数的转义，之后就可以插入到页面中
>
> 错，

## XSS 攻击的介绍

**简单地说，XSS 攻击就是页面被注入了恶意代码**

### 案例一：

```html
<input type="text" value="<%= getParameter("keyword") %>">
<button>搜索</button>
<div>
  您搜索的关键词是：<%= getParameter("keyword") %>
</div>

<!-- 攻击链接 -->
<!-- http://xxx/search?keyword="><script>alert('XSS');</script> -->

<!-- 拼接得到的HTML -->
<input type="text" value=""><script>alert('XSS');</script>">
<button>搜索</button>
<div>
  您搜索的关键词是："><script>alert('XSS');</script>
</div>
<!-- alert 弹出两次，div 和 input 的 value 都被注入了 -->

<!-- 解决：使用 escapeHTML() 进行转义 -->
<input type="text" value="<%= escapeHTML(getParameter("keyword")) %>">
<button>搜索</button>
<div>
  您搜索的关键词是：<%= escapeHTML(getParameter("keyword")) %>
</div>

<!-- 转义之后 -->
<input type="text" value="&quot;&gt;&lt;script&gt;alert(&#x27;XSS&#x27;);&lt;&#x2F;script&gt;">
<button>搜索</button>
<div>
  您搜索的关键词是：&quot;&gt;&lt;script&gt;alert(&#x27;XSS&#x27;);&lt;&#x2F;script&gt;
</div>
<!-- 恶意代码都被转义了，不会被浏览器执行，且能够完美的在页面显示出来 -->
```

该案例涉及问题：

- 页面中包含的用户输入内容都在固定的容器或属性内以文本的形式展示

- 攻击者利用用户输入片段，拼接特殊格式的字符串，突破原有限制，形成代码片段

- 攻击者通过在目标网站注入脚本，使之在浏览器上运行，引发潜在风险

- 通过 HTML 转义，可以防止 XSS 攻击(不止这么简单)

### 案例二（接案例一）：

```html
<!-- 攻击链接 -->
<!-- http://xxx/?redirect_to=javascript:alert('XSS') -->

<!-- 原页面 -->
<a href="<%= escapeHTML(getParameter("redirect_to")) %>">跳转...</a>

<!-- 攻击链接打开页面 -->
<a href="javascript:alert(&#x27;XSS&#x27;)">跳转...</a>
<!-- 当用户点击 a 标签时，将弹出 alert -->
```

```
//白名单策略
// 根据项目情况进行过滤，禁止掉 "javascript:" 链接、非法 scheme 等
allowSchemes = ["http", "https"];

valid = isValid(getParameter("redirect_to"), allowSchemes);

if (valid) {
  <a href="<%= escapeHTML(getParameter("redirect_to"))%>">
    //跳转...
  </a>
} else {
  <a href="/404">
    跳转...
  </a>
}
```

该案例涉及问题：

- HTML 转义并不能解决全部问题

- 链接跳转要检验其内容，禁止以 javascript: 开头的链接，和其他 scheme

### 案例三（接上）：

```html
<script>
var initData = <%= data.toJSON() %>
</script>
<!-- JSON 的地方不能用 escapeHTML()，因为 " 转义后，JSON 格式会被破坏 -->
<!-- 同时，JSON 也有一些特殊的敏感字符，如：U+2028/U+2029/</script> 等 -->

<!-- 所以，修复后代码 -->
<script>
var initData = <%= escapeEmbedJSON(data.toJSON()) %>
</script>
```

该案例涉及问题：

- HTML 转义要根据不同情况采用不同的规则，否则可能买下 XSS 隐患

- 避免自己写转义库，采用较为成熟、业界通用的转义库

### 总结

常见的 XSS 注入方法：

- HTML 内联文本中，恶意内容以 script 标签注入

- 内联 JS 中，拼接的数据突破了原本的限制(字符串/变量/方法名等)

- 标签属性中，内容包含引号，突破属性限制，注入其他属性或标签

- href/src 等属性，包含 javascript: 等可执行代码

- 在内联事件中，注入不受控代码

- style 属性和标签中，包含 background-image:url("javascript:...") / expression(...) 代码(注：新版浏览器已经可以防范)

## XSS 攻击的分类