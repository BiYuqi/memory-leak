---
title: 每隔四个字符添加一个空格的正则怎么写
date: 2017-03-11 17:14:44
tags: [RegExp, 正则]
categories: Javascript
---
> 最近有懒惰不少,好久没写博客了,今天在一群里看到有小伙伴问怎用正则规律的添加空格,花了几分钟写了下,做下记录

## 需求
这样的效果在填写银行卡的时候十分常见，这也是非常人性化的举措,动笔写吧,起初我想用js实现，可想想各种字符串,各种循环,我决定还是得正则靠谱.
<!-- more -->
## 实现
试了下,一个正则我还搞不定,水平有限就用俩吧：
分析：
* 首先肯定是得把4n个字符找出来
* 其次把剩余的字符找出来

```javascript
//取前4n个字符
var reg = /(\w{4})/g;
//拿到最后剩余的字符
var reg2 = /(?:\w{4})+(\w+)/g;
```
## 封装
接下来我们这这些代码组织一下,封装一个通用的方法，进而只需要传字符,可自动输出想要的字符：
```javascript
function getSpace(s){
    //过滤了空格的存在
    //实际中根据需求是否必须去掉空格
    s = s.replace(/\s*/g,'');
    if(s.length === 0){
        return '';
    }
    if(s.length < 4 && s.length !== 0){
        return s;
    }
    var m,n,res = '';
    var reg = /(\w{4})/g;
    var reg2 = /(?:\w{4})+(\w+)/;
    while(m = reg.exec(s)){
        //循环加空格
        res += m[1] +' ';
    }
    //做下判断是否是4的整数倍
    if(s.length%4 == 0){
        //整数倍会多一个空格 去除
        return res.replace(/\s$/,'');
    }else{
        //否则用俩正则
        var n = reg2.exec(s);
        return (res+n[1]);
    }
}
//Demo
var str = '1234567890';
console.log(getSpace(str));
//1234 5678 90
```
## 实战
下面是支付宝的绑定银行卡界面:
监听oninput事件,进行实时的提示用户输入的卡号
![][1]
咱们模拟下：
```javascript
//html
<input type="text" id="get">
<div class="show"></div>

//js
var box = document.querySelector('#get');
var show = document.querySelector('.show');
box.oninput = function(){
    show.innerHTML =getSpace(box.value);
}
//ok大功告成 自己测试去吧
```
![][2]
## 通用模块封装
```javascript
/*
*@param s 即将被转化的字符  String
*@param num 字符的间隔    Number
*@param type 字符的类型  String
*/
function getSpace(s,num,type){
    //过滤了空格的存在
    //实际中根据需求是否必须去掉空格
    s = s.replace(/\s*/g,'');
    if(s.length === 0){
        return '';
    }
    if(s.length < num && s.length !== 0){
        return s;
    }
    var m,n,res = '';
    var reg = new RegExp('(\\w{'+num+'})','g');
    var reg2 = new RegExp('(?:\\w{'+num+'})+(\\w+)','g');
    var reg3 = new RegExp(''+type+'$');
    while(m = reg.exec(s)){
        res += m[1] + type;
    }
    if(s.length%num == 0){
        return res.replace(reg3,'');
    }else{
        var n = reg2.exec(s);
        return (res+n[1]);
    }
}
//用法
var st = '1234567890';
getSpace(st,3,',');
//123,456,789,0
getSpace(st,4,'.');
//1234.5678.90
getSpace(st,2,'$');
//12$34$56$78$90

//诸位发挥想象力吧...........
//想怎么用就怎么用....
```
## 说明
本文所写的函数,适用于数字字母下划线,没有做只允许数字的判断,如果需要只需在函数开始对s进行判断，return 即可;如有问题,请评论区留言

[1]: http://oiukswkar.bkt.clouddn.com/bank-number.png
[2]: http://oiukswkar.bkt.clouddn.com/bank-number2.png
