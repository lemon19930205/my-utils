//1.在一个闭区间产生随机数
const random1 = (m, n) => m + Math.floor(Math.random() * (n - m));

const random = (arr, num) => arr.sort(() => Math.random() - 0.5).splice(0, num);