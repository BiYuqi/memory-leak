---
title: 从今天起写的每条正则都记录在册
date: 2017-03-20 22:45:12
tags: [正则, RegExp]
categories: Javascript
---
> 正则这门语言实在是太强大,用的好可以大大减少工作量,大多时候会写很多重复类似的正则，处于爱护脑细胞的考虑，我决定从今往后的所写的正则,都记录下来.


<!-- more -->
### 不能纯字母数字 必须包含两者
```javascript
var reg1 = /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]+$/;
var reg2 = /(?!^[0-9]+$)(?!^[a-z]+$)^[0-9a-z]+$/;
```

### 不能纯字母数字  必须包含三者 (....发散下思维判断密码强弱的表达式)
```javascript
var reg3 = /(?!^[0-9]+$)(?!^[a-z]+$)(?!^[_\-@&=]]+$)^[0-9a-z_\-@&=]+$/;
var reg4 = /^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[_\-@&=])[0-9a-z_\-@&=]+$/;
```
### 药品库规格 药品规格 测试用例
```javascript
//ex:匹配如下
//12*13  12mg*3 12mg*3 片(盒|粒)
//0.12*12 7片*6盒
var reg = /^(([1-9]+\d*(\.\d*)?)|(^0\.[1-9]+\d*))([a-zA-Zμ]*|[\u4e00-\u9fa5]*)*?\*([1-9]+\d*)[\u4e00-\u9fa5]*$/;
```

### 判断文件类型
```javascript
var reg6 = /\.(doc|png|image)$/;//等等 需要什么文件可以自动添加
```

### 排除指定字符
```javascript
//找出其中 包含 p 但不包含 ph 的所有单词，即
//[ 'python', 'javascript', 'jsonp' ]
var web_development = "python php ruby javascript jsonp perhapsphpisoutdated";
var reg = /\b(?=\w*p)(?!\w*ph)\w+\b/g
```
### 排除结尾不以什么字符结尾
```javascript
//不以is结尾的单词
var str =  `existing
            pessimist
            this
            is
            the
            `;
var reg = /\b\w+[^is]$\b/gm;//跨行
```

### 检测是否出现重复字符2个及以上(2017/4/6)
```javascript
function get(s){
    // 例如aabcdf abbbdfsdf
    var reg = /(.)\1+/g;
    //排序
    s = s.split('');
    s.sort();
    s = s.join('');
    //校验
    if(reg.test(s)){
        console.log("哎呀,碰到了重复字符")
    }
}
var str = 'asfawertyha';
get(str);
```
### 字符去重(2017/4/10)
```javascript
function get(s){
    //排序
    s = s.split('');
    s.sort();
    s = s.join('');
    //该正则与上一条有区别
    var reg = /(.)\1*/g;
    var tt = '';//存储新字符串
    var m;//变量
    while (m = reg.exec(s)){
        tt += m[1];//循环去重
    }
    //返回去重后的字符
    return tt;
}
var str = 'asfaasdwesdfrtyha';
get(str);
//adefhrstwy
```
### 匹配1000-65535区间的数字(不包含9999)(2017/5/4)
```javascript
var reg = /^(?!9999)([1-9]\d{3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
```
### 链接巧妙取纯数字(2017/5/4)
```javascript
var reg = /\b\d+\b/;
//test 尾数后面的纯数字，不出意外都可以取出来
http://www.66play.com/Home/share/match/id/39455  
http://www.66play.com/match-detail-151951
http://www.66play.com/Home/share/match/id/148853?
```
