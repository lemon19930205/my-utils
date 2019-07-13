# Set 和 Map 数据结构

## 1.Set

## 基本用法

- ES6提供的新的数据结构，类似数组，成员值唯一，没有重复的值

- Set 本身是一个构造函数

- Set 函数可以接受一个数组(或具有 iterable 接口的其他数据结构)作为参数，用来初始化。

- 利用 Set 的特性进行去重

- Set 加入值时不会发生类型转换，判断是否重复是用类似精确相等的(===)的“Same-value-zero equality”，主要区别是 Set 中 NaN 不可能重复，而 NaN === NaN => false

  ```js
  const set = new Set([1, 2, 4, 4, 5]);
  [...set]
  // [1, 2, 4, 5]

  const set = new Set(document.querySelectorAll('div'));
  set.size //2

  //去除数组的重复成员
  [...new Set(array)];

  //去除重复字符
  [...new Set('ababbc')].join('')

  let set = new Set();
  let a = NaN;
  let b = NaN;
  set.add(a);
  set.add(b);
  set // Set {NaN}

  let set = new Set();
  set.add({});
  set.size //1
  set.add({});
  set.size //2

  let obj = {};
  set.add(obj);
  set.size //3
  set.add(obj);
  set.size //3
  ```

## Set 实例的属性和方法

- 实例属性

  - Set.prototype.constructor: 构造函数，默认就是 Set 函数

  - Set.prototype.size: 返回 Set 实例成员总数

- 实例方法

  - 操作方法

    - add(value): 添加某个值，返回 Set 结构本身

    - delete(value): 删除某个值，返回布尔值，标识是否删除成功

    - has(value): 返回布尔值，表示该值是否为 Set 的成员

    - clear(): 清除所有成员，没有返回

  - 遍历方法

    - keys(): 返回键名的遍历器

    - values(): 返回键值的遍历器

    - entries(): 返回键值对的遍历器

    - forEach(): 使用回调函数遍历每个成员

    - Set 没有键名，只有键值(也可以认为是同一个值)，所以 keys 和 values 方法的行为一致

    - Set 结构的实例默认可遍历，他的默认遍历器生成函数就是 values，这意味着 for...of 可以代替 values

    - forEach 对每个成员进行操作，没有返回值，参数 value === key，第二个参数表示绑定处理函数内部的 this 对象

    - 应用

      ```js
      let set = new Set([1, 2, 3]);
      set = new Set([...set].map(item => item * 2));
      // Set {2,4,6}
      set = new Set([...set].filter(item => (item % 2) === 0));
      // Set {2,4,6}

      let a = new Set([1, 2, 3]);
      let b = new Set([4, 2, 3]);
      // 并集
      let union = new Set(...a, ...b);
      // Set {1,2,3,4}
      //交集
      let intersect = new Set([...a].filter(x => b.has(x)));
      // Set {2,3}
      //差集
      let difference = new Set([...a].filter(x => !b.has(x)));
      // Set {1}
      ```

    - Set 中没有直接的遍历方法同步改变原来的结构，担忧两种变通方法

      ```js
      //利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构
      let set = new Set([1, 2, 3]);
      set = new Set([...set].map(val => val * 2));
      //利用 Array.from 方法
      set = new Set(Array.from(set, val => val * 2));
      ```
