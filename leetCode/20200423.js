/*
 * @Author: laozhou
 * @Date: 2020-04-23 10:38:22
 * @LastEditors: laozhou
 * @LastEditTime: 2020-04-23 11:47:24
 */
/* 
给定一个只包括'(',')','[',']','{','}'的字符串，判断字符串是否有效。

有效字符串需满足：

  1.左括号必须用相同类型的右括号闭合。
  2.左括号必须以正确的顺序闭合。
  
注意空字符串可被认为是有效字符串。

示例1：
输入："()"
输出：true

示例2：
输入："()[]{}"
输出：true

示例3：
输入："(]"
输出：false

示例4：
输入："([)]"
输出：false

示例5：
输入："{[]}"
输出：true

*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  var logStr = '',
    option = { l: ['(', '[', '{'], r: [')', ']', '}'] };
  for (let i = 0; i < s.length; i++) {
    const str = s[i];
    if (option.l.indexOf(str) > -1) {
      logStr += option.l.indexOf(str);
    } else if (option.r.indexOf(str) > -1) {
      if (option.r.indexOf(str) == logStr[logStr.length - 1]) {
        logStr = logStr.slice(0, logStr.length - 1);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  return logStr ? false : true;
};

var isValid2 = function(s) {
  var logStr = '';
  while (s != logStr) {
    logStr = s;
    s = s.replace('()', '')
      .replace('[]', '')
      .replace('{}', '');
  }
  return s ? false : true;
};

console.log(isValid2('()'));
console.log(isValid2('()[]{}'));
console.log(isValid2('(]'));
console.log(isValid2('([)]'));
console.log(isValid2('{[]}'));
