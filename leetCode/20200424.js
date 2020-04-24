/*
 * @Author: laozhou
 * @Date: 2020-04-24 10:09:26
 * @LastEditors: laozhou
 * @LastEditTime: 2020-04-24 15:57:56
 */
/* 
将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例：

输入：1->2->4,1->3->4
输出：1->1->2->3->4->4

*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 别人的答案
var mergeTwoLists = function(l1, l2) {
  if (l1 && l2) {
    var node;
    if (l1.val > l2.val) {
      node = new ListNode(l2.val);
      node.next = mergeTwoLists(l1, l2.next);
    } else {
      node = new ListNode(l1.val);
      node.next = mergeTwoLists(l1.next, l2);
    }
    return node;
  }
  return l1 || l2;
};

var mergeTwoLists2 = function(l1, l2) {
  if (l1 && l2) {
    var nodeAry = [];
    while (l1 || l2) {
      if (!l1 || !l2) {
        nodeAry.push(l1 ? l1 : l2);
        l1 = l2 = null;
      } else if (l1.val > l2.val) {
        nodeAry.push(new ListNode(l2.val));
        l2 = l2.next;
      } else {
        nodeAry.push(new ListNode(l1.val));
        l1 = l1.next;
      }
    }
    if (nodeAry.length > 1) {
      for (let i = nodeAry.length - 1 - 1; i >= 0; i--) {
        nodeAry[i].next = nodeAry[i + 1];
      }
    }
    return nodeAry[0];
  }
  return l1 || l2;
};

console.log(
  JSON.stringify(
    mergeTwoLists2(
      { val: 1, next: { val: 2, next: { val: 4 } } },
      { val: 1, next: { val: 3, next: { val: 4 } } }
    )
  )
);
console.log(
  JSON.stringify(
    mergeTwoLists2({ val: -9, next: { val: 3 } }, { val: 5, next: { val: 7 } })
  )
);
