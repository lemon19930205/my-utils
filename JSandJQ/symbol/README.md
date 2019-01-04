# Symbol

## 概述

- ES6 引入了一种新的原始数据类型Symbol,表示独一无二的值.它是JavaScript语言的第七种数据类型,前六种是:undefined、null、布尔值(Boolean)、字符串(String)、数值(Number)、对象(Object).
- 是类字符串类型,因其独一无二的特性,常用于设置方法名和属性名
- Symbol的值通过Symbol函数生成
- Symbol函数前不能用new,因为生成的Symbol是一个原始类型的值,不是对象,所以也不能添加属性.

   ```javascript
    let s = Symbol();

    typeof s
    // "symbol"
   ```

- 可以接受一个字符串作为参数,表示对Symbol实例的描述,用于区分.

   ```javascript
    let s1 = Symbol('foo');
    let s2 = Symbol('bar');

    s1 // Symbol(foo)
    s2 // Symbol(bar)

    s1.toString() // "Symbol(foo)"
    s2.toString() // "Symbol(bar)"
   ```

- 如果参数是一个对象,就会调用该对象的toString方法,将其转化为字符串,然后才生成一个Symbol值

   ```javascript
    const obj = {
      toString() {
        return 'abc';
      }
    };
    const sym = Symbol(obj);
    sym // Symbol(abc)
   ```

- 参数只是对当前Symbol值的描述,因此相同参数的Symbol函数返回的值是不相等的

   ```javascript
    // 没有参数的情况
    let s1 = Symbol();
    let s2 = Symbol();

    s1 === s2 // false

    // 有参数的情况
    let s1 = Symbol('foo');
    let s2 = Symbol('foo');

    s1 === s2 // false
   ```

- Symbol值不能与其他类型的值进行运算,但可以显式转为字符串,也可以转为布尔值,但是不能转为数值

   ```javascript
    let sym = Symbol('My symbol');

    "your symbol is " + sym
    // TypeError: can't convert symbol to string
    `your symbol is ${sym}`
    // TypeError: can't convert symbol to string


    let sym = Symbol('My symbol');

    String(sym) // 'Symbol(My symbol)'
    sym.toString() // 'Symbol(My symbol)'


    let sym = Symbol();
    Boolean(sym) // true
    !sym  // false

    if (sym) {
      // ...
    }

    Number(sym) // TypeError
    sym + 2 // TypeError
   ```
