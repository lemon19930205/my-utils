
/*静态页启动服务，将所有访问都指向index，需要装express*/

let express = require('express');
let app = express();
app.listen(80);
app.use(express.static('dist'));
app.get('*',function (req,res) {
  res.sendFile('./dist/index.html',{root:__dirname})
});


