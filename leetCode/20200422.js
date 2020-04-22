/*
 * @Author: laozhou
 * @Date: 2020-04-22 16:39:08
 * @LastEditors: laozhou
 * @LastEditTime: 2020-04-22 18:23:07
 */
/* 
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例1：
输入：["flower","flow","flight"]
输出："fl"

示例1：
输入：["dog","racecar","car"]
输出：""

说明：

所有输入只包含小写字母 a-z 。
*/
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  var comStr = '',
    itemAry = strs && strs.length ? strs[0].split('') : [];
  for (let i = 0; i < itemAry.length; i++) {
    const item = itemAry[i];
    if (
      strs.every(function(val, key) {
        return val[i] === item;
      })
    ) {
      comStr += item;
    } else {
      break;
    }
  }
  return comStr;
};

var longestCommonPrefix2 = function(strs) {
  return strs && strs.length ? strs.reduce(function(pre, str) {
    for (let i = 0; i < pre.length; i++) {
      if (str.indexOf(pre.substr(0, i + 1)) !== 0) {
        return pre.substr(0, i);
      }
    }
    return pre;
  }) : '';
};

console.log(longestCommonPrefix2(['flower', 'flow', 'flight']));
console.log(longestCommonPrefix2(['dog', 'racecar', 'car']));
console.log(longestCommonPrefix2(['aca', 'cba']));
console.log(longestCommonPrefix2([]));