# Promise

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
