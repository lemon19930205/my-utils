"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _mysql = require("mysql");

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//创建exp服务
var app = (0, _express2.default)();
app.use(_express2.default.static(__dirname + '/'));
var server = _http2.default.createServer(app);
/* app.get('/', function (req, res) {
  res.send('Hello World!')
}) */
server.listen(3000, 'localhost', function () {
  console.log('listen 3000!');
});

//连接mysql
var connection = _mysql2.default.createConnection({
  host: '10.10.52.216',
  port: '3306',
  user: 'superxyy',
  password: 'superxyy123',
  database: 'push_msg'
});
connection.connect();

//创建socket.io服务，监听接口
var io = _socket2.default.listen(server);
io.on('connection', function (socket) {
  console.log('a socket is connect,id:' + socket);
  //io.sockets.emit('message'.socket)
});

//推送消息
var i = 0;
setInterval(function () {
  i++;
  //查询该表所有数据
  var sql = 'SELECT * FROM msg';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('查询失败：' + err);
    }
    var msg_item = result[0];
    console.log('推送消息:我的消息' + i + msg_item);
    io.emit('message', msg_item);
  });
}, 10000);

//connection.end();