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

## 作为属性名的 Symbol

- 利用Symbol的值都是不相等的特性,使其可以作为标识符,用于对象属性名.(防止出现相同的,或被改写和覆盖)

   ```javascript
    let mySymbol = Symbol();

    // 第一种写法
    let a = {};
    a[mySymbol] = 'Hello!';

    // 第二种写法
    let a = {
    [mySymbol]: 'Hello!'
    };

    // 第三种写法
    let a = {};
    Object.defineProperty(a, mySymbol, { value: 'Hello!' });

    // 以上写法都得到同样结果
    a[mySymbol] // "Hello!"
   ```

- 注:Symbol值作为对象属性名时,不能用点运算符(点运算符后的属性名是字符串,非变量或Symbol值).Symbol值定一属性时,Symbol值必须放在方括号中.

   ```javascript
    const mySymbol = Symbol();
    const a = {};

    a.mySymbol = 'Hello!';
    a[mySymbol] // undefined
    a['mySymbol'] // "Hello!"


    let s = Symbol();

    let obj = {
      [s]: function (arg) { ... }
    };

    obj[s](123);


    let obj = {
      [s](arg) { ... }
    };
   ```

- 用于定义常量(因其任何值都不可能相同,就可以保证switch语句正常执行)

   ```javascript
    const log = {};

    log.levels = {
      DEBUG: Symbol('debug'),
      INFO: Symbol('info'),
      WARN: Symbol('warn')
    };
    console.log(log.levels.DEBUG, 'debug message');
    console.log(log.levels.INFO, 'info message');


    const COLOR_RED    = Symbol();
    const COLOR_GREEN  = Symbol();

    function getComplement(color) {
      switch (color) {
        case COLOR_RED:
          return COLOR_GREEN;
        case COLOR_GREEN:
          return COLOR_RED;
        default:
          throw new Error('Undefined color');
        }
    }
   ```

- Symbol作为属性名时是公开属性,不是私有属性

## 实例:消除魔术字符串

- 魔术字符串:在代码中多次出现、与代码形成强耦合的某一个具体的字符串或者数值(应该尽量消除魔术字符串,改由含义清晰的变量代替)

   ```javascript
    function getArea(shape, options) {
      let area = 0;

      switch (shape) {
        case 'Triangle': // 魔术字符串
          area = .5 * options.width * options.height;
          break;
        /* ... more code ... */
      }

      return area;
    }

    getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串


    const shapeType = {
      triangle: 'Triangle'
    };

    function getArea(shape, options) {
      let area = 0;
      switch (shape) {
        case shapeType.triangle:
          area = .5 * options.width * options.height;
          break;
      }
      return area;
    }

    getArea(shapeType.triangle, { width: 100, height: 100 });


    const shapeType = {
      triangle: Symbol()
    };
   ```

## 属性名的遍历

- Symbol作为属性名,不会出现在for...in、for...of循环中,也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回.但它也不是私有属性,可以通过Object.getOwnPropertySymbols方法获取所有Symbol属性名.