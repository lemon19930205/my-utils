# 如何防止 XSS 攻击

### 目录

- [XSS 攻击的介绍](#XSS-攻击的介绍)

- [XSS 攻击的分类](#XSS-攻击的分类)

- [XSS 攻击的预防和检测](#XSS-攻击的预防)

- [XSS 攻击的总结](#XSS-攻击的总结)

- [XSS 攻击案例](#XSS-攻击案例)

> ## 阅读理解(判断)
>
> XSS 防范是后端的责任，后端应该在所有用户提交数据的接口对敏感字符转义才能进行下一步操作
>
> 不正确
> - 存储型和反射型是需要后端处理的，而 DOM 型是需要前端处理的。防范 XSS 是需要前后端 共同参与的系统工程
> - 转义应该在输出 HTML 时进行，而不是用户提交时
>
> 插入页面的数据都要通过一个通用的敏感字符过滤函数的转义，之后就可以插入到页面中
>
> 不正确，由于不同位置转义规则不一致，需要选取合适的转义库，并针对不同的上下文调用不同的规则


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

### 什么是 XSS

- Cross-Site Scripting，跨站脚本攻击，简称 XSS(用‘ X ’是为了和 CSS 区分)，是一种代码注入攻击

- 攻击者通过在目标上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息(如：Cookie/SessionID 等)

- 本质：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨，从而导致恶意代码执行。而且由于是在用户的终端执行，恶意代码可以直接获取用户信息，或者利用这些信息冒充用户向网站发起攻击者定义的请求

- 由于输入限制，一般是通过外部引入脚本在浏览器执行，来完成攻击策略

- 用户“注入”恶意脚本的方式

  - 来自用户的 UGC 信息

  - 来自第三方的链接

  - URL 参数

  - POST 参数

  - Referer (可能来自不可信的来源)

  - Cookie (可能来自其他子域注入)

### XSS 分类

|    类型    |         存储区          |     插入点      |
| :--------: | :---------------------: | :-------------: |
| 存储型 XSS |       后端数据库        |      HTML       |
| 反射型 XSS |           URL           |      HTML       |
| DOM 型 XSS | 后端数据库/前端存储/URL | 前端 JavaScript |

> 存储区：恶意代码存放位置
> 
> 插入点：有谁取得恶意代码，并插入到网页上

- 存储型 XSS

  - 攻击者(恶意代码)->目标网站的数据库

  - 用户打开网站，数据库(恶意代码)->浏览器(HTML)

  - 用户浏览器解析执行(恶意代码同时被执行)

  - 恶意代码窃取用户数据->攻击者网站(或冒充用户调用接口执行操作)

- 反射型 XSS

  - 攻击者构造特殊 URL(包含恶意代码)

  - 用户打开 URL，服务端将恶意代码->拼接到 HTML->返回浏览器

  - 浏览器解析执行(恶意代码执行)

  - 窃取用户数据或冒充用户行为(同上)

  - 主要依赖 URL 传参(POST 触发较难实现)，需要用户主动打开恶意链接

- DOM 型 XSS

  - 构造特殊 URL(包含恶意代码)

  - 用户打开 URL

  - 浏览器解析执行，JS 取出 URL 中的恶意代码执行

  - 窃取用户数据或冒充用户行为(同上)

  - 恶意代码的取出和执行都由浏览器执行，属于前端 JS 自身的安全漏洞，上面两种 XSS 都属于服务端的安全漏洞

## XSS 攻击的预防

> XSS 攻击的两大要素：
> 
> 1.攻击者提交恶意代码
> 2.浏览器执行恶意代码

### 阻止攻击者提交恶意代码(通过输入过滤)

- 前端过滤 -- 不可行

  - 攻击者可绕过前端直接构造请求。

- 后端写入数据前过滤 -- 不可行

  - 在提交阶段不清楚内容要输出到哪里

    - 内容可能同时提供前端和客户端，若经过 escapeHTML()，则客户端显示有问题

    - 前端中，不同位置所需编码不同(HTML/JS/VUE模板/长度计算/alert 等)

  - 对于明确输入类型(数字/URL/电话号码/邮件 等)进行输入过滤还是有必要的

**结论：通过过滤阻止提交的方法并不完全可靠，就需要通过"防止浏览器执行恶意代码"来防范 XSS**

### 防止浏览器执行恶意代码

> 防止 HTML 中出现注入(存储型/反射型攻击)
> 
> 防止 JavaScript 执行时，执行恶意代码(DOM 型攻击)

- 预防存储型/反射型攻击

  - 纯前端渲染，代码和数据分离

    - 浏览器先加载一个静态 HTML，当中不包含业务数据

    - 浏览器执行 JS

    - JS 通过 Ajax 加载业务数据，调用 DOM API 更新到页面

    - 适用于内部/管理系统，对性能和 SEO 有一定的影响

  - 对 HTML 充分转义

    - 需要采用合适的转义库

    - 常用的模板引擎(doT.js/FreeMarker 等)，有一个简单的 HTML 转义规则(& < > " ' / 等字符)，能起到一定的作用

    - 完善的 XSS 防护需要更完善更细致的转义策略

      - 例：Java 工程常用转义库 org.owasp.encoder

        ```html
        <!-- HTML 标签内文字内容 -->
        <div><%= Encode.forHtml(UNTRUSTED) %></div>

        <!-- HTML 标签属性值 -->
        <input value="<%= Encode.forHtml(UNTRUSTED) %>" />

        <!-- CSS 属性值 -->
        <div style="width:<= Encode.forCssString(UNTRUSTED) %>">

        <!-- CSS URL -->
        <div style="background:<= Encode.forCssUrl(UNTRUSTED) %>">

        <!-- JavaScript 内联代码块 -->
        <script>
          var msg = "<%= Encode.forJavaScript(UNTRUSTED) %>";
          alert(msg);
        </script>

        <!-- JavaScript 内联代码块内嵌 JSON -->
        <script>
        var __INITIAL_STATE__ = JSON.parse('<%= Encoder.forJavaScript(data.to_json) %>');
        </script>

        <!-- HTML 标签内联监听器 -->
        <button
          onclick="alert('<%= Encode.forJavaScript(UNTRUSTED) %>');">
          click me
        </button>

        <!-- URL 参数 -->
        <a href="/search?value=<%= Encode.forUriComponent(UNTRUSTED) %>&order=1#top">

        <!-- URL 路径 -->
        <a href="/page/<%= Encode.forUriComponent(UNTRUSTED) %>">

        <!--
          URL.
          注意：要根据项目情况进行过滤，禁止掉 "javascript:" 链接、非法 scheme 等
        -->
        <a href='<%=
          urlValidator.isValid(UNTRUSTED) ?
            Encode.forHtml(UNTRUSTED) :
            "/404"
        %>'>
          link
        </a>
        ```

- 预防 DOM 型 XSS 攻击

  - DOM 型攻击的本质是前端 JS 代码不够严谨

  - 谨慎使用 .innerHTML/.outerHTML/document.write()，尽量使用 .textContent/.setAttribute() 等

  - Vue/React 中不使用 v-html/dangerouslySetInnerHTML

  - 尽量避免：DOM 中内联时间监听(location/onclick/onerror/onload/onmouseover 等)a 标签的 href 属性，JavaScript 的 eval()/setTimeout()/setInterval() 等

    ```html
    <!-- 内联事件监听器中包含恶意代码 -->
    <img onclick="UNTRUSTED" onerror="UNTRUSTED" src="data:image/png,">

    <!-- 链接内包含恶意代码 -->
    <a href="UNTRUSTED">1</a>

    <script>
    // setTimeout()/setInterval() 中调用恶意代码
    setTimeout("UNTRUSTED")
    setInterval("UNTRUSTED")

    // location 调用恶意代码
    location.href = 'UNTRUSTED'

    // eval() 中调用恶意代码
    eval("UNTRUSTED")
    </script>

    ```

### 其他 XSS 防范措施

> 仅仅依靠渲染页面和执行 JavaScript 时谨慎的转义是不够的，需要一些成熟的通用方案

- CSP(Content Security Policy)

  - 禁止加载外域代码，防止复杂的攻击逻辑

  - 禁止外域提交

  - 禁止内联脚本执行(较严格，GitHub在用)

  - 禁止未授权脚本执行(新特性，Google Map 移动版在用)

  - 合理使用上报，及时发现 XSS，及时修复

- 输入内容长度控制

  - 给不受信内容限制一个合理的长度，增加 XSS 攻击的难度

- 其他

  - HTTP-only Cookie:禁止 JS 读取敏感 Cookie，则攻击者完成 XSS 也无法窃取 Cookie

  - 验证码：防止脚本冒充用户提交危险操作

### XSS 的检测

- 通过 XSS 攻击字符串手动检测

  ```
  jaVasCript:/*-/*`/*\`/*'/*"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\x3csVg/<sVg/oNloAd=alert()//>\x3e
  ```

- 通过扫描工具自动检测

  -  Arachni、Mozilla HTTP Observatory、w3af 等

## XSS 攻击的总结

> 整体的 XSS 防范复杂且繁琐，不同位置的合适转义，防止多余和错误的转义，避免乱码

技术手段无法完全避免 XSS，遵守以下原则可减少漏洞产生：

- 利用模板引擎，自带转义功能

- 避免内联事件

- 避免拼接 HTML

- 时刻保持警惕

- 增加攻击难度，降低攻击后果

- 主动检测发现

## XSS 攻击案例

**[参考] [掘金-前端安全系列（一）：如何防止XSS攻击？](https://juejin.im/post/5bad9140e51d450e935c6d64#heading-13)**