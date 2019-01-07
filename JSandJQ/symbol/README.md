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

   ```javascript
    const obj = {};
    let a = Symbol('a');
    let b = Symbol('b');

    obj[a] = 'Hello';
    obj[b] = 'World';

    const objectSymbols = Object.getOwnPropertySymbols(obj);

    objectSymbols
    // [Symbol(a), Symbol(b)]


    const obj = {};

    let foo = Symbol("foo");

    Object.defineProperty(obj, foo, {
      value: "foobar",
    });

    for (let i in obj) {
      console.log(i); // 无输出
    }

    Object.getOwnPropertyNames(obj)
    // []

    Object.getOwnPropertySymbols(obj)
    // [Symbol(foo)]
   ```

- Reflect.ownKeys可以返回所有类型的键名(包括常规键名和Symbol键名)

   ```javascript
    let obj = {
      [Symbol('my_key')]: 1,
      enum: 2,
      nonEnum: 3
    };

    Reflect.ownKeys(obj)
    //  ["enum", "nonEnum", Symbol(my_key)]
   ```

- Symbol的属性名不会被常规方法遍历到,可以定义非私有、单有希望只用于内部的方法.

   ```javascript
    let size = Symbol('size');

    class Collection {
      constructor() {
        this[size] = 0;
      }

      add(item) {
        this[this[size]] = item;
        this[size]++;
      }

      static sizeOf(instance) {
        return instance[size];
      }
    }

    let x = new Collection();
    Collection.sizeOf(x) // 0

    x.add('foo');
    Collection.sizeOf(x) // 1

    Object.keys(x) // ['0']
    Object.getOwnPropertyNames(x) // ['0']
    Object.getOwnPropertySymbols(x) // [Symbol(size)]
   ```

## Symbol.for(),Symbol.keyFor()

- Symbol.for()接受一个字符串作为参数,然后搜索(全局环境中)有没有以该参数作为名称的Symbol值.如果有就返回这个Symbol值,如果没有就新建一个该名称的Symbol值,并在全局环境中登记.

   ```javascript
    let s1 = Symbol.for('foo');
    let s2 = Symbol.for('foo');

    s1 === s2 // true


    Symbol.for("bar") === Symbol.for("bar")
    // true

    Symbol("bar") === Symbol("bar")
    // false
   ```

- Symbol.keyFor()返回一个已经登记到全局环境的Symbol的key

   ```javascript
    let s1 = Symbol.for("foo");
    Symbol.keyFor(s1) // "foo"

    let s2 = Symbol("foo");
    Symbol.keyFor(s2) // undefined
   ```

- Symbol.for()为Symbol登记的名字是全局环境,是可以在不同的iframe或service worker中取到同一个值.

   ```javascript
    iframe = document.createElement('iframe');
    iframe.src = String(window.location);
    document.body.appendChild(iframe);

    iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
    // true
   ```

## 实例:模块的Singleton模式

- 指:调用一个类,任何时候返回的都是同一个实例.在node中,保证保存在global中的实例不会被无意篡改,但也是可修改的.

   ```javascript
    // mod.js
    function A() {
      this.foo = 'hello';
    }

    if (!global._foo) {
      global._foo = new A();
    }

    module.exports = global._foo;


    const a = require('./mod.js');
    console.log(a.foo);


    global._foo = { foo: 'world' };

    const a = require('./mod.js');
    console.log(a.foo);


    // mod.js
    const FOO_KEY = Symbol.for('foo');

    function A() {
      this.foo = 'hello';
    }

    if (!global[FOO_KEY]) {
      global[FOO_KEY] = new A();
    }

    module.exports = global[FOO_KEY];


    global[Symbol.for('foo')] = { foo: 'world' };

    const a = require('./mod.js');

    // mod.js
    const FOO_KEY = Symbol('foo');
    //由于外部无法引用,所以无法改写
    // 后面代码相同 ……
   ```

## 内置的Symbol值

- ES6提供了11个内置的Symbol值,指向一个方法、属性或构造函数

- Symbol.hasInstance:指向一个内部方法,当其他对象使用instanceof运算符,判断是否为该对象的实例时,会调用这个方法.

   ```javascript
    class MyClass {
      [Symbol.hasInstance](foo) {
        return foo instanceof Array;
      }
    }

    [1, 2, 3] instanceof new MyClass() // true


    class Even {
      static [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
      }
    }

    // 等同于
    const Even = {
      [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
      }
    };

    1 instanceof Even // false
    2 instanceof Even // true
    12345 instanceof Even // false
   ```

- Symbol.isConcatSpreadable:是对象的一个布尔值的属性,表示该对象用于Array.prototype.concat()时,是否可以展开,true--可以展开,false--不可展开(默认是undefined,可以展开).

   ```javascript
    let arr1 = ['c', 'd'];
    ['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
    arr1[Symbol.isConcatSpreadable] // undefined

    let arr2 = ['c', 'd'];
    arr2[Symbol.isConcatSpreadable] = false;
    ['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']


    let obj = {length: 2, 0: 'c', 1: 'd'};
    ['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

    obj[Symbol.isConcatSpreadable] = true;
    ['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']


    class A1 extends Array {
      constructor(args) {
        super(args);
        this[Symbol.isConcatSpreadable] = true;
      }
    }
    class A2 extends Array {
      constructor(args) {
        super(args);
      }
      get [Symbol.isConcatSpreadable] () {
        return false;
      }
    }
    let a1 = new A1();
    a1[0] = 3;
    a1[1] = 4;
    let a2 = new A2();
    a2[0] = 5;
    a2[1] = 6;
    [1, 2].concat(a1).concat(a2)
    // [1, 2, 3, 4, [5, 6]]
    //注：Symbol.isConcatSpreadable的位置差异,A1是定义在实例上,A2是定义在类本身,效果相同.
   ```

- Symbol.species:指向一个构造函数,创建衍生对象时,会使用该属性.常用于,有些类库是在基类的基础上修改的,那么子类继承方法时,作者希望返回基类的实例,而不是子类的实例.

   ```javascript
    class MyArray extends Array {
    }

    const a = new MyArray(1, 2, 3);
    const b = a.map(x => x);
    const c = a.filter(x => x > 1);

    b instanceof MyArray // true
    c instanceof MyArray // true


    //更改衍生对象的所属类
    class MyArray extends Array {
      static get [Symbol.species]() { return Array; }
    }


    //默认相当于
    static get [Symbol.species]() {
      return this;
    }


    class MyArray extends Array {
      static get [Symbol.species]() { return Array; }
    }

    const a = new MyArray();
    const b = a.map(x => x);

    b instanceof MyArray // false
    b instanceof Array // true


    class T1 extends Promise {
    }

    class T2 extends Promise {
      static get [Symbol.species]() {
        return Promise;
      }
    }

    new T1(r => r()).then(v => v) instanceof T1 // true
    new T2(r => r()).then(v => v) instanceof T2 // false
   ```

- Symbol.match:指向一个函数,当执行str.match(myObject)时,如果该属性存在,就会调用它,返回该方法的返回值.

   ```javascript
    String.prototype.match(regexp)
    // 等同于
    regexp[Symbol.match](this)

    class MyMatcher {
      [Symbol.match](string) {
        return 'hello world'.indexOf(string);
      }
    }

    'e'.match(new MyMatcher()) // 1
   ```

- Symbol.replace:指向一个方法,当该对象被String.prototype.replace方法调用时,会返回该方法的返回值.

   ```javascript
    String.prototype.replace(searchValue, replaceValue)
    // 等同于
    searchValue[Symbol.replace](this, replaceValue)


    const x = {};
    x[Symbol.replace] = (...s) => console.log(s);

    'Hello'.replace(x, 'World') // ["Hello", "World"]
   ```

- Symbol.search:指向一个方法,当该对象被String.prototype.search方法调用时,会返回该方法的返回值.

   ```javascript
    String.prototype.search(regexp)
    // 等同于
    regexp[Symbol.search](this)

    class MySearch {
      constructor(value) {
        this.value = value;
      }
      [Symbol.search](string) {
        return string.indexOf(this.value);
      }
    }
    'foobar'.search(new MySearch('foo')) // 0
   ```

- Symbol.split:指向一个方法,当该对象被String.prototype.split方法调用时,会返回该方法的返回值.

   ```javascript
    String.prototype.split(separator, limit)
    // 等同于
    separator[Symbol.split](this, limit)


    class MySplitter {
      constructor(value) {
        this.value = value;
      }
      [Symbol.split](string) {
        let index = string.indexOf(this.value);
        if (index === -1) {
          return string;
        }
        return [
          string.substr(0, index),
          string.substr(index + this.value.length)
        ];
      }
    }
    //相当于重新定义了split方法

    'foobar'.split(new MySplitter('foo'))
    // ['', 'bar']

    'foobar'.split(new MySplitter('bar'))
    // ['foo', '']

    'foobar'.split(new MySplitter('baz'))
    // 'foobar'
   ```

- Symbol.iterator:指向该对象的默认遍历器方法(如:对象进行for...of循环时).

   ```javascript
    const myIterable = {};
    myIterable[Symbol.iterator] = function* () {
      yield 1;
      yield 2;
      yield 3;
    };

    [...myIterable] // [1, 2, 3]


    class Collection {
      *[Symbol.iterator]() {
        let i = 0;
        while(this[i] !== undefined) {
          yield this[i];
          ++i;
        }
      }
    }

    let myCollection = new Collection();
    myCollection[0] = 1;
    myCollection[1] = 2;

    for(let value of myCollection) {
      console.log(value);
    }
    // 1
    // 2
  ```

- Symbol.toPrimitive:指向一个方法,该对象被转为原始类型的值时,会调用这个方法,返回该对象的原始类型的值.被调用时会接受一个字符串参数,表示当前运算的模式,一共三种(Number:需转换成数值;String:需转换为字符串;Default:可以转换为数值,也可以转换为字符串).

   ```javascript
    let obj = {
      [Symbol.toPrimitive](hint) {
        switch (hint) {
          case 'number':
            return 123;
          case 'string':
            return 'str';
          case 'default':
            return 'default';
          default:
            throw new Error();
        }
      }
    };

    2 * obj // 246
    3 + obj // '3default'
    obj == 'default' // true
    String(obj) // 'str'
  ```

- Symbol.toStringTag:指向一个方法,在该对象调用Object.prototype.toString方法时,如果这个属性存在,它的返回值会出现在toSting方法返回的字符串中,表示对象的类型.

   ```javascript
    // 例一
    ({[Symbol.toStringTag]: 'Foo'}.toString())
    // "[object Foo]"

    // 例二
    class Collection {
      get [Symbol.toStringTag]() {
        return 'xxx';
      }
    }
    let x = new Collection();
    Object.prototype.toString.call(x) // "[object xxx]"
  ```

  内置对象属性:

  - JSON[Symbol.toStringTag]：'JSON'
  - Math[Symbol.toStringTag]：'Math'
  - Module 对象M[Symbol.toStringTag]：'Module'
  - ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
  - DataView.prototype[Symbol.toStringTag]：'DataView'
  - Map.prototype[Symbol.toStringTag]：'Map'
  - Promise.prototype[Symbol.toStringTag]：'Promise'
  - Set.prototype[Symbol.toStringTag]：'Set'
  - %TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'等
  - WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
  - WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
  - %MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
  - %SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
  - %StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
  - Symbol.prototype[Symbol.toStringTag]：'Symbol'
  - Generator.prototype[Symbol.toStringTag]：'Generator'
  - GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'

- Symbol.unscopables:指向一个对象,该对象指定了使用with关键字时,哪些属性会被排除.

   ```javascript
    Array.prototype[Symbol.unscopables]
    // {
    //   copyWithin: true,
    //   entries: true,
    //   fill: true,
    //   find: true,
    //   findIndex: true,
    //   includes: true,
    //   keys: true
    // }

    Object.keys(Array.prototype[Symbol.unscopables])
    // ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']


    // 没有 unscopables 时
    class MyClass {
      foo() { return 1; }
    }

    var foo = function () { return 2; };

    with (MyClass.prototype) {
      foo(); // 1
    }

    // 有 unscopables 时
    class MyClass {
      foo() { return 1; }
      get [Symbol.unscopables]() {
        return { foo: true };
      }
    }

    var foo = function () { return 2; };

    with (MyClass.prototype) {
      foo(); // 2
    }
  ```

### 参考：http://es6.ruanyifeng.com/#docs/symbol