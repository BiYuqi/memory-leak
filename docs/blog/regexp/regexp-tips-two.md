---
title: 一个有点意思的正则
date: 2017-07-01 21:37:38
tags: [RegExp, 正则]
---
> 周末闲来无事，没事逛逛前端群,碰到一个有点意思的题目,记录下来

## 需求
一个数组，里面的字符串都有相同的前几个字，但是后面的不相同  如何把这相同的提取出来
大概像下面这样：
```js
const arr = ['test23','testtr','test90'] //共同体 test
const arr1 = ['tes23','testtr','test90'] //共同体 tes  小心搞错哦
const arr2 = ['回家3','回家5','回家吗'] // 共同体 回家
```
## 我的方法
看到的第一感觉就是用正则(谁让我逻辑很菜呢...)
```js
/**
* @param {len} 数组长度 下面用来匹配重复的个数
* @param {reg} 不用说了，我们的匹配规则
* @param {data} 换个思路，当做字符串进行处理
*/
function getWord(arr){
    var len = arr.length,
        reg = new RegExp('^(.*)(.*\\1){'+(len-1)+'}','g'),
        data = arr.join('');
    return reg.exec(data)[1]
}
console.log(getWord(arr)) // test
console.log(getWord(arr1)) //tes
console.log(getWord(arr2)) //回家
```
## 使用场景
我也不知道(逃...),我就想安安静静的温习个正则而已.
如果有更好的方法，烦请与我联系,向您请教，如有bug,请轻拍.我的邮箱：biyuqiwan@163.com
