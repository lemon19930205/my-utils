/*
 * @Author: laozhou
 * @Date: 2020-04-08 10:01:33
 * @LastEditors: laozhou
 * @LastEditTime: 2020-04-08 15:04:48
 */
/* 
罗马数字包含以下七种字符：I,V,X,L,C,D 和 M。

字符  数值
 I     1 
 V     5 
 X     10 
 L     50 
 C     100 
 D     500 
 M     1000 

例如，罗马数字 2 写作 II，即为两个并列的 1 。12 写作 XII ，即为 X + II 。
27 写作 XXVII ，即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字右边。但也存在特例，例如 4 不写做 IIII ，而是 IV 。
数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样的，数字 9 表示为 IX 。
这个特殊规则只适用于以下六种情况：

- I 可以放在 V（5）和X（10）的左边，来表示 4 和 9。
- X 可以放在 L（50）和C（100）的左边，来表示 40 和 90。
- C 可以放在 D（500）和M（1000）的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

示例 1：
输入： "III"
输出： 3

示例 2：
输入： "IV"
输出： 4

示例 3：
输入： "IX"
输出： 9

示例 4：
输入： "LVIII"
输出： 58
解释：L = 50 ,V = 5 ,I = 1.

示例 5：
输入： "MCMXCIV"
输出： 1994
解释：M = 1000 ,CM = 900 ,XC = 90 ,IV = 4.

*/

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  var option = [
    {
      roman: 'CD',
      num: 400
    },
    {
      roman: 'CM',
      num: 900
    },
    {
      roman: 'XL',
      num: 40
    },
    {
      roman: 'XC',
      num: 90
    },
    {
      roman: 'IV',
      num: 4
    },
    {
      roman: 'IX',
      num: 9
    },
    {
      roman: 'I',
      num: 1
    },
    {
      roman: 'V',
      num: 5
    },
    {
      roman: 'X',
      num: 10
    },
    {
      roman: 'L',
      num: 50
    },
    {
      roman: 'C',
      num: 100
    },
    {
      roman: 'D',
      num: 500
    },
    {
      roman: 'M',
      num: 1000
    }
  ];

  option.forEach(function(item) {
    s = s.replace(new RegExp(item.roman, 'g'), item.num + ',');
  });

  return s.split(',').reduce(function(pre, cur) {
    return Number(pre) + Number(cur);
  });
};

var romanToInt2 = function(s) {
  var option = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };
  return s.split('').reduce(function(pre, cur, i, ary) {
    if (option[cur] < option[ary[i + 1]]) {
      return pre - option[cur];
    } else {
      return pre + option[cur];
    }
  }, 0);
};

// console.log(romanToInt2('III'));
// console.log(romanToInt2('IV'));
// console.log(romanToInt2('IX'));
// console.log(romanToInt2('LVIII'));
// console.log(romanToInt2('MCMXCIV'));
// console.log(romanToInt2('D'));

/**
 * @param {number} n
 * @return {string}
 */
var intToRoman = function(n) {
  var s = '';
  var option = [
    {
      roman: 'M',
      num: 1000
    },
    {
      roman: 'CM',
      num: 900
    },
    {
      roman: 'D',
      num: 500
    },
    {
      roman: 'CD',
      num: 400
    },
    {
      roman: 'C',
      num: 100
    },
    {
      roman: 'XC',
      num: 90
    },
    {
      roman: 'L',
      num: 50
    },
    {
      roman: 'XL',
      num: 40
    },
    {
      roman: 'X',
      num: 10
    },
    {
      roman: 'IX',
      num: 9
    },
    {
      roman: 'V',
      num: 5
    },
    {
      roman: 'IV',
      num: 4
    },
    {
      roman: 'I',
      num: 1
    }
  ];

  option.forEach(function(item) {
    var com = n / item.num;
    if (com > 0) {
      for (let i = 0; i < Math.floor(com); i++) {
        s += item.roman;
        n -= Math.floor(com) * item.num;
      }
    }
  });

  return s
};

console.log(intToRoman(3));
console.log(intToRoman(4));
console.log(intToRoman(9));
console.log(intToRoman(58));
console.log(intToRoman(1994));
