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
