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
   7. 