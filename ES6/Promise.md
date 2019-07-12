# Promise

## 遇到的奇怪问题

```js
setTimeout(() => {}, 0);

new Promise((resolve, reject) => {
  console.log(4.1)
  resolve(4.2)
}).then((res) => {
  return setTimeout(() => {}, 0);
}).then(value=>{
  console.log(value);
  // 2
  //经实验发现，2代表“事件队列”中未执行的定时器数量
});

setInterval(() => {}, 10);
setInterval(() => {}, 10);

new Promise((resolve, reject) => {
  resolve(setTimeout(() => {}, 0))
}).then((res) => {
  console.log(res)
  //3
  return setTimeout(() => {}, 0);
}).then((value) => {
  console.log(value);
  //4
});
```

## 1.含义

- 是异步编程的一种解决方案，比传统的 **回调函数和事件** 更合理和更强大

- 简单说就是一个容器，里面保存着未来才会结束事件(通常是一个异步操作)的结果

- Promise 对象的三个状态：**pending(进行中)\fulfilled(已成功)\rejected(已失败)**

- Promise 对象的两个特点：

  - 对象状态不受外界影响。promise 名字的由来，状态只取决于异步操作的结果。

  - 一旦状态改变，就不会在变，任何时候都可以得到这个结果。

- 可以将异步操作的流程以同步操作的流程表达出来，避免层层嵌套

- 一些缺点：

  - 一旦新建立即执行，无法中途取消

  - 如果不设置回调函数，Promise 内部抛出错误不会反应到外部

  - 无法精确 pending 的阶段

## 2.基本用法

- 创建一个 Promise 实例

  ```js
  const promise = new Promise(function(resolve,reject){
    //...some code
    if(/* 异步操作成功 */){
      resolve(value)
    } else {
      reject(error)
    }
  });
  ```

- 实例生成后回调，then 可以接收两个回调函数作为参数，第二个参数相当于当前结果的 catch

  ```js
  promise.then(function(value){
    //success
  },function(error){
    //failure
  })
  ```

- 异步 Promise 例子(可用于异步加载图片/Ajax 封装等)

  ```js
  function timeout(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms, 'done');
    })
  }
  timeout(100).then((value) => {
    console.log(value);
  })
  ```

- 创建后会立即执行

  ```js
  let promise = new Promise(function(resolve,reject){
    console.log('Promise');
    resolve();
  });
  promise.then(function(){
    console.log('resolevd.')
  });
  console.log('Hi!');

  //Promise
  //Hi!
  //resolevd.
  ```

- 给 resolve 传入一个 Promise 实例(即：返回另一个 Promise)，则原 Promise 的状态就会被传入的 Promise 的状态覆盖

  ```js
  const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000);
  })

  const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000);
    //此时 p1 是 pending 状态的 Promise,将会等待 p1 状态改变后,p1 的返回将覆盖 p2 的返回
  })

  p2.then(res => console.log('res ' + res)).catch(err => console.log('err ' + err));

  let times = setInterval(() => {
    console.log(p1, p2);
  }, 1000);

  setTimeout(() => {
      clearInterval(times)
  }, 5000);
  ```

- 调用 resolve 或 reject 并不会终结 Promise 的参数函数的执行

  ```js
  new Promise(function(resolve,reject){
    resolve(2);
    console.log(1);
  }).then(res=>{
    console.log(res)
  });
  //2
  //1

  new Promise(function(resolve,reject){
    return resolve(2);
    //后面的语句将不会执行
    console.log(1);
  });
  ```

## 3.Promise.prototype.then()

- 为 Promise 添加状态改变时的回调函数，then 方法的第一个参数是 resolved 状态的回调函数，第二个参数(可选)是 rejected 状态的回调函数

- then 返回一个新的 Promise 实例，因此可采用链式写法，then 方法后再调用另一个 then，第一个 then 返回的结果将作为参数传入第二个 then

  ```js
  getJSON("/posts.json").then(function(json){
    return json.post
  }).then(function(post){
    //...
  });
  ```

- 如果前一个回调返回的还是一个 Promise 对象(即有异步操作)，此时后一个函数就会等待该 Promise 对象状态变化后才被调用

  ```js
  getJSON("/posts/1.json").then(function(post){
    return getJSON(post.commentURL);
  }).then(function funA(comments){
    console.log("resolved:",comments);
  },function funB(err){
    console.log("rejected:",err);
  });

  //更简洁
  getJSON("/posts/1.json").then(
    post => getJSON(post.commentURL)
  ).then(
  comments => console.log("resolved:",comments),
  err => console.log("rejected:",err)
  );
  ```

## 4.Promise.prototype.catch()

- catch(fn) 相当于 then(null/undefined,fn),用于指定发生错误时的回调函数

  ```js
  getJSON("/posts.json").then(function(posts){
    //...
  }).catch(function(err){
    //处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log("发生错误：",err);
  });
  ```

- reject 方法的作用等同于抛出错误

  ```js
  const promise = new Promise(function(resolve,reject){
    throw new Error('test');
  });
  promise.catch(err => {
    console.log(res);
  });

  //等价
  const promise = new Promise(function(resolve,reject){
    reject(new Error('test'));
  });
  promise.catch(err => {
    console.log(res);
  });
  ```

- 如果 Promise 状态已经变成 resolced，再抛出错误是无效的(即：Promise 的状态一旦改变就永久保持该状态了)。

  ```js
  const promise = new Promise(function(resolve,reject){
    resolve('ok')
    throw new Error('test');
  });
  promise.then(value => {
    console.log(value);
  }).catch(err => {
    console.log(err);
  });
  //ok
  ```

- Promise 的对象具有“冒泡”性质，会一直想后传递，直到被捕获为止。

- 一般来说不要在 then 方法中定义 reject 回调(即 then 的第二个参数)，总是使用 catch，因为当前 then 的 reject 不能捕获当前 then 当中 resolve 回调中抛出的错误，而 catch 可以。

- Promise 内部的错误不会影响外部代码

- Node 有一个 unhandledRejection 事件，专门监听未捕获的 reject 错误(Node 计划在未来废除 unhandledRejection)

  ```js
  process.on('undandleRejection',function(err,p){
    //err 错误对象，p 报错的 Promise 实例
    throw err;
  })
  ```

- 如果 Promise 指定在下一轮“事件轮询”再抛出错误。到时，Promise 的运行已经结束了，所以这个错误在 Promise 函数体外抛出，会冒泡到最外层。

  ```js
  const promise = new Promise(function (resolve, reject) {
    resolve('ok');
    setTimeout(() => {
      throw new Error('test')
    }, 0);
  });
  promise.then(function (value) {
    console.log(value);
  }).catch(function (err) {
    console.log(err);
  })
  ```

- catch 方法返回的还是一个 Promise 对象，因此后面可以接着调用 then/catch，如果没有报错则会跳过 catch,之后的 then 方法里报错就与前面的 catch 无关了

- catch 方法中还能再抛出错误，可以在后面的 catch 中捕获

## 5.Promise.prototype.finally()

- 不管 Promise 对象最后的状态如何，都会执行的操作。类似 ajax 的 complete

- finally 不接受任何参数，不依赖 Promise 的执行结果，本质上是 then 方法的特例

  ```js
  promise.finally(()=>{
    //语句
  })

  //等同于
  promise.then(function (value) {
    //语句
    return value
  },function (err) {
    //语句
    throw value
  })

  //finally 实现
  Promise.prototype.finally = function(callback){
    let P = this.constructor;
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason})
    )
  }
  ```

- finally 总是返回原来的值

  ```js
  //resolve 的值是 undefined
  let p1 = Promise.resolve(2).then(() => {}, () => {});
  //resolve 的值是 2
  let p2 = Promise.resolve(2).finally(() => {}, () => {});

  console.log(p1, p2);

  p1.then(value=>console.log('p1',value));
  p2.then(value=>console.log('p2',value));
  ```

## 6.Promise.all()

- 将多个 Promise 实例包装成一个新的 Promise 实例

- 接受一个数组为参数，每一项都是 Promise 实例，如果不是就会调用 Promise.resolve 方法，将参数转为 Promise 实例(参数可以不是数组，但必须具有 Iterator(迭代器) 接口)，其返回的每个成员都是 Promise 实例

- p 的状态由 p1\p2\p3 决定：

  - p1\p2\p3 的状态都变成 fulfilled，P 的状态才会变成 fulfilled，此时 p1\p2\p3 的返回值组成一个数组，传递给 p 的回调函数

  - 只要 p1\p2\p3 中有一个被 rejected,p 的状态就变成 rejected，第一个被 rejected 的实例的返回值，回传给 p 的回调函数

    ```js
    const p = Promise.all([p1,p2,p3]);

    //生成一个 Promise 对象的数组
    const promise = [2,3,5,7,11,13].map((id)=>{
      return getJSON('/post/'+ id +'.json');
    });
    Promise.all(promise).then((value)=>{
      //...
    }).catch((err)=>{
      //...
    })
    ```

- 注：如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦被 rejected，并不会触发 Promise.all() 的 catch 方法

  ```js
  const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  }).then(result => result).catch(err => err);

  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了')
  }).then(result => result).catch(err => err);

  Promise.all([p1,p2])
  .then(result=>console.log('result',result))
  .catch(e=>console.log('e',e));
  //"result" ["hello",Error:报错了]
  ```

- 上面 p2 的 catch 返回的是一个全新的 Promise 实例，p2 实际上指向的是这个实例，所以执行完 catch 之后，也会由 rejected 变成 resolved，导致 all() 方法参数两个实例都是 resolved，因此会调用 then

- 如果 p2 没有自己的 catch,就会调用 all() 的 catch

## 7.Promise.race()

- 将多个 Promise 实例，包装成一个新的 Promise 实例。

- p1\p2\p3 中只要有一个状态改变，p 就跟着变。那个最先改变的 Promise 实例返回值传给 p 的回调函数

- race 和 all 的用法相似，all 效果类似 every，race 效果类似 some

- 同样可以将非 Promise 实例的参数转换成 Promise

  ```js
  const p = Promise.race([
    fetch('/xxxx'),
    new Promise((resolve,reject)=>{
      return setTimeout(()=>{throw new Error('request timeout')},5000)
    })
  ]);

  p.then(console.log).catch(console.error);
  //如果5秒内 fetch 无法返回结果，p 的状态就会变成 rejected，从而触发 catch
  ```

## 8.Promise.resolve()

- 将现有对象转为 Promise 对象

  ```js
  Promise.resolve('foo');
  //等价于
  new Promise(resolve=>resolve('foo'));
  ```

- 参数的四种情况：

  - 是一个 Promise 实例，则原封不动的返回

  - 是一个 thenable 对象(即具有 then 方法的对象)，则会将这个对象转为 Promise 对象，然后立即执行 thenable 对象的 then 方法

    ```js
    let thenable = {
      then:function(resolve,reject){
        resolve(42)
      }
    };

    Promise.resolve(thenable).then(value=>{
      console.log(value); //42
    });
    ```

  - 参数不是具有 then 的对象，或根本不是对象，则返回一个新的 Promise 对象，状态为 resolve，同时将参数传给回调函数

  - 不带又任何参数，则直接返回一个 resolved 状态的 Promise 对象(注：立即 resolve() 的 Promise 对象，是在本轮‘事件循环’的结束时执行，而不是在下一轮“事件循环”的开始)

    ```js
    setTimeout(() => {
      console.log(3);
    }, 0);

    Promise.resolve().then(() => {
      console.log(2);
    });

    new Promise((resolve, reject) => {
      console.log(4.1)
      resolve(4.2)
    }).then((res) => {
      console.log(res);
      return 4.3
    }).then((value) => {
      console.log(value);
    });

    Promise.resolve().then(() => {
      console.log(2.1);
    });

    console.log(1);
    //4.1 1 2 4.2 2.1 4.3 3
    ```

## 9.Promise.reject()

- 返回一个新的 Promise 实例，状态为 rejected

- 与 resolve() 不同的是,rejected() 会原封不动的将参数传入后续方法中

  ```js
  let thenable = {
    then:function(resolve,reject){
      reject('出错了')
    }
  };

  Promise.reject(thenable).catch(e => {
    console.log(e === thenable);
    //true
  });
  ```

## 10.应用

- 加载图片，一旦加载完成 Promise 的状态就改变

- Generator 与 Promise 结合，用 Generator 函数管理流程，遇到异步操作则返回一个 Promise 对象。在函数 run 中处理 Promise 对象，并调用 next 方法。

  ```js
  function getFoo() {
    return new Promise(function (resolve, reject) {
      resolve('foo');
      //reject('报错了');
    });
  }

  const g = function* () {
    try {
      const foo = yield getFoo();
      console.log(foo);
      const foo1 = yield '777';
    } catch (e) {
      console.log(e);
    }
  };

  function run(generator) {
    const it = generator();

    function go(result) {
      if (result.done) return result.value;

      return result.value.then((value) => {
        return go(it.next(value));
      }).catch((err) => {
        return go(it.throw(err))
      });
    }

    go(it.next());
  }

  run(g);
  ```

## 11.Promise.try()

- 提案阶段，在 Promise 库 Bluebird\Q 和 when 中早就提供这个方法了

- 不管是同步还是异步函数都想用 Promise 来处理，这样不管是同步还是异步函数，都可以用 then 指向下一步流程，用 catch 处理抛出的错误

- 期望达到，用 Promise 处理同步函数同步执行，异步函数异步执行

  ```js
  const f = () => console.log('now');

  //Promise.resolve().then(f);
  //next
  //now

  //(async () => f())().then().catch();
  //now
  //next

  (
    () => new Promise(
      resolve => resolve(f())
    )
  )();
  //now
  //next

  console.log('next');
  ```

- 可用 Promise.try 方法代替(提案阶段，不可用！)

  ```js
  const f = () => console.log('now');
  Promise.try(f);
  console.log('next');
  //now
  //next
  ```

- 提供统一处理机制，可以用 then 方法管理流程，用 catch 方法捕获异常(包括同步和异步的异常)

  ```js
  database.users.get({id:userId}).then(...).catch(...);
  //只能捕获异步的异常

  try {
    database.users.get({id:userId}).then(...).catch(...);
  } catch (e) {
    //...
  }
  //同步和异步异常都能捕获，但是比较繁琐，需要分开处理

  Promise.try(() => database.users.get({id:userId}))
  .then(...).catch(...)
  //同/异步异常都在 catch 中捕获，完美
  ```

- Promise.try 实际上就像是模拟 try 代码块，promise.catch 模拟的是 catch 代码块
