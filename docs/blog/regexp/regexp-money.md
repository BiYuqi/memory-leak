---
title: 阿拉伯数字千分位用逗号分隔
date: 2017-03-18 20:50:30
tags: [RegExp, "正则"]
---

> 上回说到字符正向加逗号或者其他字符,主要用户银行卡号等场景，而且封装成了通用代码;这回准备写点关于金钱的东西,今天写点不一样的。

## 前言
我经常在上市公司年报上看到这样的字眼:** 本公司首次向社会公众发行人民币普通股（A 股）10,720,000.00 股。募集资金总额为人民币 239,270,400.00 元.** 千分位加逗号,今天咱们用正则实现这样的效果
<!-- more -->
## 代码
```javascript
/*
*@param s 字符
*/
function setMoney(s){
    if(s.length < 3){
        return;
    }
    //判断是否有小数位 如果有,需要多加判断
    if(s.indexOf('.') > -1){
        var index = s.indexOf('.');
        var last = s.substr(index);
        s = s.substr(0,index).replace(/\B(?=(\d{3})+$)/g,',');
        s = s + last;
        return s;
    }else{
        //没有小数的就直接返回
        return s.replace(/\B(?=(\d{3})+$)/g,',')
    }
}
//测试
var str = '123123123123.56';
console.log(setMoney(str))
//123,123,123,123.56
```

## 要不封装一下？
```javascript
/**
*   @param {Number} num 字符
*   @param {String} type 字符类型 , . 。等等
*   @param {Number} len 间隔位数
*/
function setMoney(num,type,len){
    if(num.length < 3){
        return;
    }
    var reg = new RegExp('\\B(?=(\\d{'+len+'})+$)','g');
    //判断是否有小数位 如果有,需要多加判断
    if(num.indexOf('.') > -1){
        var index = str.indexOf('.');
        var last = str.substr(index);
        num = num.substr(0,index).replace(reg,''+type+'');
        num = num + last;
        return num;
    }else{
        //没有小数的就直接返回
        return num.replace(reg,''+type+'')
    }
}
//测试
console.log(setMoney2(str,',',5))
//12,31231,23123.56
console.log(setMoney2(str,',',3))
//123,123,123,123.56
```
## 结语
今天就先写到这,最近一直在研究正则,所以稍微总结了一些案例,后续可能还是以js为主,正则可能相对会减少发表,过几天写一个日常用的正则案例的博客,就正则这东西,几天不用就会遗忘,保持持续更新...以上代码都有做测试,如果有什么疑问,可以与我联系 biyuqiwan@163.com
