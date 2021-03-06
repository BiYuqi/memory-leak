---
title: 正则匹配字符串英文首字母小写转大写
date: 2017-02-05 19:27:10
tags: [RegExp]
categories: Javascript
---
> ** 周末无事，刚好最近一直在温习正则,就写了个小demo，匹配替换英文字符中首字母,并进行大写转换**


<!-- more -->
### <font color="#FF0000">Demo演示</font>
[点击查看demo][3]
### 需求实现一篇英文文稿中单词首字母大写化
第一步首先得匹配上每个单词，包括紧跟着单词后面的标点符号
```javascript
//正则
//考虑了单词中会有数字,标点,换行,引用
//规则如下
/["a-zA-Z0-9]+[,.!-'—""]*\s?\n?/g;
```
### 封装函数
```javascript
/*
* @target 目标文本
* @range 输出值
* ToTarget(match) 匹配replace 回调函数
*
*/
function ToLetterUpper(target){
    var reg = /["a-zA-Z0-9]+[,.!-'—""]*\s?\n?/g;
    var range = '';//转化后的内容
    //匹配的内容大写
    function ToTarget(match){
        return match.toUpperCase();
    }
    while(match = reg.exec(target)){
        range += match[0].replace(/^[a-z]{1}/,ToTarget);//调用方法
    }
    return range;
}
```
### Test
```javascript
var str = 'At least 36, people. have been killed';
ToLetterUpper(str);
//At Least 36, People. Have Been Killed
```
### 参考资料
* [MDN][1]

[1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
[2]: http://oiukswkar.bkt.clouddn.com/letter.jpg
[3]: https://biyuqi.github.io/demo/src/html/letToUper.html
