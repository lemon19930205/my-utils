# JQ源码探究

## 记录

- ## 2018.12.28 整体架构初步了解
   1. 最先处理的运行环境适配 (包括浏览器环境和node环境)
   2. "use strict"-严格模式 (越强大的库就需要越严格的代码风格)
   3. 常用方法的预声明,如:slice (方法提出,减少代码量;应用于其他数据类型)
   4. 全局默认值及局部默认值 (减少代码量,增强可读性)
   5. 一次性执行代码函数封装 (动态创建script,动态写入code,创建后自动执行,然后删除)
      ```javascript
        function DOMEval( code, doc ) {
          doc = doc || document;
          var script = doc.createElement( "script" );
          script.text = code;
          doc.head.appendChild( script ).parentNode.removeChild( script );
        }
      ```
   6. jquery.fn中先封装(继承)一些原生的基础方法,如:slice;写入版本号:jQuery.fn.jquery
- ## 2019.01.04
   1. 首先封装实现的是extend:
      - 方法默认值;
      - 参数的兼容性处理(如:如果除了首个boolean参数外只有一个参数,则为对jq本身的扩展);
      - 如果deep(第一个参数)为true,用递归实现深拷贝,否则只是浅拷贝,合并的结果将受引用的影响
   2. 通过extend方法,在jq上添加一些属性和方法:
      - expando:版本号+随机后缀,标识,用来区分当前页面jq;
      - isReady:假设已经加载完毕;
      - each/map等
- ## 2019.01.07
   1. 大量的兼容性处理,包括IE和IOS等
   2. dom选择器,属性选择器等字符串解析工作都用正则匹配,减少代码量,高可读性
   3. 强大的dom选择器,从document开始选取(并做浏览器兼容)->判断是单一还是复杂的选择(考虑性能,区分处理)->使用合适的原生选择器选取到原生dom(仍考虑浏览器兼容性)->进行处理返回jqdom
   4. dom的一些简单核心的操作(如:val(),attr()),实现一些css选择器(如:first,even)
   5. 用ES5实现了一些ES6的方法(可能是互相借鉴)
   6. 原型和继承等技术的合理应用
   7. jQuery/$的全局处理,以及链式精髓-> return jQuery;

## 针对方法(实现)阅读