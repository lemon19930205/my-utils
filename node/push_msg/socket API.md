# client API


## 引用

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io('http://localhost');
</script>
```
```js
const io = require('socket.io-client');
// or with import syntax
import io from 'socket.io-client';
```


## **io([url][, options])**

### 返回:socket实例
  ```js
  const socket = io('http://localhost');
  ```

## url (String) (default window.location)
- 自定义命名空间 admin
  ```js
  const socket = io('http://localhost/admin'});
  ```

## options (Object)
- forceNew (Boolean) (default null)：是否启用新的连接
- path  (String) (default '')：自定义路径