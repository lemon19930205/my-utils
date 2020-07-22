import express from "express"
import http from "http"
import socket from "socket.io"
import mysql from "mysql";

//创建exp服务
let app = express();
app.use(express.static(__dirname + '/'));
let server = http.createServer(app);
/* app.get('/', function (req, res) {
  res.send('Hello World!')
}) */
server.listen(3000, 'localhost', function () {
  console.log('listen 3000!')
});

//连接mysql
let connection = mysql.createConnection({
  host: '10.10.52.216',
  port: '3306',
  user: 'superxyy',
  password: 'superxyy123',
  database: 'push_msg'
});
connection.connect();

//创建socket.io服务，监听接口
let io = socket.listen(server);
io.on('connection', (socket) => {
  console.log('a socket is connect,id:' + socket);
  //io.sockets.emit('message'.socket)
});

//推送消息
let i = 0;
setInterval(() => {
  i++;
  //查询该表所有数据
  let sql = 'SELECT * FROM msg'
  connection.query(sql, (err, result) => {
    if (err) {
      console.log('查询失败：' + err);
    }
    let msg_item = result[0];
    console.log('推送消息:我的消息' + i + msg_item);
    io.emit('message', msg_item);
  });

}, 10000)




//connection.end();