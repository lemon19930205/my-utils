/*
 * @Author: laozhou
 * @Date: 2020-04-03 10:59:14
 * @LastEditors: laozhou
 * @LastEditTime: 2020-04-03 14:52:13
 */
/* 
判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1：
输入：121
输出：true

示例 2：
输入：-121
输出：false
解释：从左向右读，为 -121 。从右向左读，为 121- 。因此它不是一个回文数。

示例 3：
输入：10
输出：false
解释：从右向左读，为 01 。因此它不是一个回文数。

进阶：
你能不将整数转化为字符串来解决这个问题吗？*/

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  var xS = x.toString(),
    flag = true;
  for (let i = 0; i < Math.floor(xS.length / 2); i++) {
    if (xS[i] !== xS[xS.length - 1 - i]) {
      flag = false;
    }
  }
  return flag;
};

var isPalindrome2 = function(x) {
  if (x >= 0) {
    var rX = 0,
      dX = x;
    while (dX > 0) {
      rX *= 10;
      rX += dX % 10;
      dX = Math.floor(dX / 10);
    }
    if (rX === x) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

var isPalindrome3 = function(x) {
  return x == x.toString().split("").reverse().join("");
};

console.log(isPalindrome3(121));
console.log(isPalindrome3(-121));
console.log(isPalindrome3(10));
