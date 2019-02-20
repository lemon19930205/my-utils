# 前端入门

## 目录

- 1.2 HTML
  - HTML 简介
    1. 浏览器标签栏图标

       ```javascript
         <link rel="icon" href="xxx.ico">
       ```

    2. HTML 语义化
       - \<header> 标签通常放在页面或页面某个区域的顶部，用来设置页眉；
       - \<nav> 标签可以用来定义导航链接的集合，点击链接可以跳转到其他页面；
       - \<article> 标签中的内容比较独立，可以是一篇新闻报道，一篇博客，它可以独立于页面的其他内容进行阅读；
       - \<section> 标签表示页面中的一个区域，通常对页面进行分块或对内容进行分段，\<section> 标签和 \<article> 标签可以互相嵌套；
       - \<aside> 标签用来表示除页面主要内容之外的内容，比如侧边栏；
       - \<footer> 标签位于页面或页面某个区域的底部，用来设置页脚，通常包含版权信息，联系方式等。
  - HTML5 特性归类
    1. HTML5 DOM
       - 只涉及元素节点的操作，建议使用针对元素节点操作的属性代替节点操作的属性，如：childNodes -> children
       - ele.scrolllntoView:移动元素到指定区域
    2. HTML5 事件
       - contextmenu:编辑右键菜单
       - DOMContentLoaded优于window.load执行
       - ？？？---readystatechange：监听动态载入的script、link标签是否完成。
       - hashchange:监听url#后的部分(包括#)改变，在window上监听
    3. HTML5 表单
       - input/textarea 新增 autofocus:页面加载时自动获取焦点
       - ？？---checkValidate() 校验 required、pattern="\d+" 属性
    4. HTML5 脚本
       - 跨文档消息传递(XDM)，核心是postMessage
       - drop:拖拽
       - 媒体元素：video、audio
       - 浏览器状态管理 history
  - HTML5 存储
    1. sessionStorage/localStorage:大小上限2.5Mb(不同浏览器有差异)，页面关闭会/不会清空；(api:setItem(key,value);getItem(key);removeItem(key);clear())
    2. cookie(4kb)、IndexedDB(5Mb)、cacheStorage(ServiceWorker)
  - HTML5 JavaScript Api
    1. requestAnimationFrame
    2. Web Worker