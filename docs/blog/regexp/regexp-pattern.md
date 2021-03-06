---
title: 贪婪与非贪婪模式
date: 2017-12-28 22:50:30
tags: [javascript,RegExp,"正则"]
categories: Javascript
---
## 前言
本文属于 正则表达式系列文章之一，将近一个多月了停更了，这个系列的坑得赶紧填了~~~
## 目录

- 正则表达式系列 - 入门篇
- 正则表达式系列 - 贪婪与非贪婪模式
- 正则表达式系列 - 零宽断言篇(待写)

## 贪婪模式与非贪婪模式快速理解

所谓贪婪模式表达式本身会尽可能的匹配更多内容,非贪婪则反之；我们可以这么理解，一个人很贪婪，所以他会能拿多少拿多少，换过来，那就是贪婪模式下的正则表达式，能匹配多少就匹配多少，尽可能最多。而非贪婪模式，则是能不匹配就不匹配，尽可能最少

## 贪婪模式非贪婪实战

** 贪婪模式标识符 **
<font style="color:#c33;padding:2px;">+</font>、<font style="color:#c33;padding:2px;">?</font>、<font style="color:#c33;padding:2px;">\*</font>、<font style="color:#c33;padding:2px;">{n}</font>、<font style="color:#c33;padding:2px;">{n,}</font>、<font style="color:#c33;padding:2px;">{n,m}</font>
<br>
上述标识符，代表是贪婪匹配，会尽可能多的去匹配内容

** 非贪婪模式标识符 **
<font style="color:#c33;padding:2px;">+?</font>、<font style="color:#c33;padding:2px;">??</font>、<font style="color:#c33;padding:2px;">\*?</font>、<font style="color:#c33;padding:2px;">{n}?</font>、<font style="color:#c33;padding:2px;">{n,}?</font>、<font style="color:#c33;padding:2px;">{n,m}?</font>
<br>
非贪婪模式的标识符很有规律，就是贪婪模式的标识符后面加上一个<font style="color:#c33;padding:2px;">?</font>

** 示例 **

需求：匹配1后面跟任意个0
目标源：10001
```js
使用贪婪模式：10*       结果：1000
使用非贪婪模式：10*?    结果：1

const reg = /10*/
const reg2 = /10*?/
console.log(reg.match('10001'))
console.log(reg2.match('10001'))
```

[贪婪示例](https://regex101.com/r/XUpYgg/2)
[非贪婪示例](https://regex101.com/r/XUpYgg/3)

1.<font style="color:#c33;padding:2px;">*</font>代表匹配0个或多个的意思：
贪婪模式下，他首先匹配一个1然后匹配1后面的0，最多匹配到3个，因此是1000，假如我们的正则加上g模式匹配,会得到1000 和 1 两个结果

2.非贪婪模式下，表示首先匹配一个1，然后以后面的0能不匹配就不匹配了，所以每次只匹配一个，然而，假如我们的正则加上g模式匹配,1 和 1 两个结果

```js
// 使用贪婪模式：10*       结果：1000 和 1
// 使用非贪婪模式：10*?    结果：1 和 1
const reg = /10*/g
const reg2 = /10*?/g
console.log(reg.match('10001'))
console.log(reg2.match('10001'))
```
[贪婪示例](https://regex101.com/r/XUpYgg/5)
[非贪婪示例](https://regex101.com/r/XUpYgg/4)

** 看懂了？ **
我们在来个例子：
需求：匹配1后面跟任意个0，再跟一个1
源串：10001

```js
// 使用贪婪模式：10*1      结果：10001
// 使用非贪婪模式：10*?1    结果：10001

const reg = /10*/
const reg2 = /10*?/
console.log(reg.match('10001'))
console.log(reg2.match('10001'))
```
** 什么鬼？为什么两个结果一样**
因为，正则表达式要判断完这整个正则才算成功：

1.贪婪模式，首先匹配到一个1，然后后面尽可能的多匹配0，发现3个，最后一个匹配上1，至此，正则表达式完成匹配得到10001

2.非贪婪模式，首先匹配到一个1，然后0*？是非贪婪模式，后面他不想匹配了，于是就瞅瞅后面看到1没？一看，我去，还是0，这下不能偷懒了，只能匹配0了，于是同样的故事上演了三次后，终于看到了希望，看到同胞兄弟1，完成正则匹配，得到10001
[贪婪示例](https://regex101.com/r/XUpYgg/7)
[非贪婪示例](https://regex101.com/r/XUpYgg/6/)

** 那究竟哪个好呢？ **
什么时候使用贪婪模式，什么时候使用非贪婪模式，哪个性能好，哪个性能不好，不能一概而论，要根据情况分析。
下面我举个例子：
源码：
```html
<a href="http://loadingmore.com/2017/11/18/Js上传图片本地预览几种姿势/" target="_blank" >Js上传图片本地预览几种姿势</a>
```
提取链接和文本：

```js
const reg1 = /<a [^>]*?href="([^"]*?)"[^>]*?>([^<]*?)<\/a>/
const reg2 = /<a [^>]*?href="([^"]*)"[^>]*>([^<]*)<\/a>/
const reg3 = /<a [^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/
```

[reg1运行次数](https://regex101.com/r/XUpYgg/8) (150次)
[reg2运行次数](https://regex101.com/r/XUpYgg/9) (24次)
[reg3运行次数](https://regex101.com/r/XUpYgg/10) (98次)

正则1是通用写法，正则2是在确定字符不会溢出的情况下消除非贪婪模式，正则3是证明并不是全部消除非贪婪模式就是最优。
关于贪婪模式好还是非贪婪模式好的讨论，只能说根据需求而定，不过，在平时的时候用，一般使用非贪婪模式较多，因为贪婪模式经常会由于元字符范围限制不严谨而导致匹配越界，得到非预期结果。

## 提取数据示例

### 提取两个""中的子串，其中不能再包含""
需求: 提取两个引号之间的子串，其中不能再包括引号，例如上述的提取结果应该是: "regular expression" 与 "Regex"(每一个结束的"后面都接空格)
```js
const str = `"The phrase \"regular expression\" is called \"Regex\" for short"`
const reg = /"[^"]*" /g // 注意正则最后面一个空格
console.log(str.match(reg)) // [""regular expression" ", ""Regex" "]
```
[案例demo](https://regex101.com/r/XUpYgg/11)
分析：
1.从第一个"开始匹配，接下来到12位时("r的")，不满足[^"]，也不满足之后的"+空格，因此匹配失败了，index挪到下一个，开始下一次匹配
2.第二个匹配从"r的"开始，一直匹配到n"空格的空格，这一组刚刚好匹配成功(因为最后符合了正则的"空格)，匹配好了"regular expression"空格
3.第三个匹配匹配到了"Regex"空格(过程不再复述)
4.到最后时，仅剩一个"直接匹配失败(因为首先得符合"才能开始正则匹配)
5.至此，正则匹配结束，匹配成功，并且符合预期

## 最后

本文也只是做一些浅显的分析与引导，更多是起到抛砖引玉的作用，要深入理解还请去了解正则的原理

[正则表达式之 贪婪与非贪婪模式详解](http://www.jb51.net/article/31491.htm)
