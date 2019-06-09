
//import fs from 'fs'

let  fs = require('fs');
let  join = require('path').join;
/**
 *
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
  //let result=[];
  function finder(path) {
    let files=fs.readdirSync(path);
    files.forEach((val,index) => {
      let fPath=join(path,val);
      let stats=fs.statSync(fPath);             //文件属性
      //if(stats.isDirectory()) finder(fPath);  //如果是文件夹就回调检索下一层
      if(stats.isDirectory()) return ;          //如果是文件夹就跳过
      //if(stats.isFile()) result.push(fPath);  //将文件名添加到数组中

      //匹配符合的文件后缀
      /*if(/(.vdat)$/.test(val)){
        let fileName = val.slice(0,val.indexOf('.'));
        //包含路径的旧/新名字
        let oldName = fPath;
        let newName = join(path,fileName+'.mp4');
        //console.log(path,fileName);
        fs.rename(oldName, newName, (err) => {
          if (err) throw err;
          console.log(`${fileName}重命名完成`);
        });
      }*/

      //匹配空格符
      if(/\s/.test(val)){
        let fileName = val.slice(0,val.indexOf(' '));
        //包含路径的旧/新名字
        let oldName = fPath;
        let newName = join(path,fileName+'.mp4');
        //console.log(path,fileName);
        fs.rename(oldName, newName, (err) => {
          if (err) throw err;
          console.log(`${fileName}重命名完成`);
        });
      }

    });
  }
  finder(startPath);

  //return result;
}
let fileNames=findSync('D:/123/淘金客/12306/91/');

/*
fs.rename('C:/Users/36062/Desktop/6666.jpg', 'C:/Users/36062/Desktop/6666.333', (err) => {
  if (err) throw err;
  console.log('重命名完成');
});*/
