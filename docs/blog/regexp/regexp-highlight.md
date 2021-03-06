---
title: 正则实现代码高亮
date: 2017-03-18 15:52:23
tags: [Javascript, "正则"]
categories: Javascript
---
> 最近鼓捣了个markdown在线预览的编辑器,基于vue2.0实现,对vue的理解程度还没有那么深,所以代码高亮,断行没有用插件来实现,于是决定用正则来简单实现.

## 场景
经常写代码，写业务难免要查询某些数据和字符串打交道,其中正则便是一个提高编程效率的实用工具,还没了解正则的建议好好学一学.** [编辑器在这里][0]** | ** [正则表达式30分钟入门教程][1]**
<!-- more -->
## 第一步取html
示例代码,给代码块加高亮,断行,前提是在整个HTML文档中先取出代码块，再对代码块进行操作
** 取数据：**
```javascript
//这就是我所用到的正则
//<code[^>]+>  找到code代码段 包含里面含有class 等属性的情况
//[\s\S]+? [\s\S]代表匹配文档中任何一个位置 +不止一处  ?非贪婪模式
//非贪婪模式可以匹配每一段code的内容，如不加？ 诸位可以试下会匹配到什么
var regCode = /<code[^>]+>([\s\S]+?)<\/code>/g;
```
** 取出的数据源:**
```html
<code class="javascript language-javascript">
    function loadStyle(href){
        var link = document.createElement("link");   
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = href;   
        var head = document.getElementsByTagName("head")[0];   
        head.appendChild(link);
    }
    loadStyle(demo.css);
</code>
```

## 第二步写规则
这里我把正则分开写了,分别配置了不同关键词,对应的颜色,考虑到性能,复杂度可以把这些正则写在一起,用|隔开也行,这里我就偷懒了，先这样
```javascript
var config = {
    regs:[
        /\b(var|function|return|new|try|exec|match|catch|break|continue|case|for|if|else|while|switch)\b/g,
        /(this)/g,
        /(true|false)/g,
        /([+])/g,
        /\b(document|innerHTML)\b/g,
        /\b(createElement|getElementsByTagName|appendChild|querySelector|querySelectorAll|getElementById)\b/g
    ],
    fontColor:[
        '#9E70DD',
        '#9B2C34',
        '#D19A66',
        '#42A2EF',
        '#E06A6C',
        '#50B2BC'
    ]
};
```

## 第三步 处理关键词
假设我们的html数命名为 s 现在来替换s中的代码段里面的关键词
我们的配置项为6个  所以直接for循环
```javascript
for(var i=0;i<6;i++){
    //对codes 进行循环替换
    s = s.replace(config.regs[i],function(m){
        return '<span style="color:'+config.fontColor[i]+'">'+m+'</span>'
    })
}
```
## 第四步 处理函数名高亮
```javascript
//函数名高亮
//匹配代码块内函数名
var regName = /\s(\w+)\(/g;
var res = [];
while(m = regName.exec(s)){
    res.push(m[1])
}
for(var i=0;i<res.length;i++){
    s = s.replace(res[i],'<span style="color:#3081E3">'+res[i]+'</span>')
}
```
## 第五步 处理函数断行加<br>
```javascript
var regCode = /<code[^>]+>([\s\S]+?)<\/code>/g;
var content;
//收集每一行代码
var conStr=[];
while(content = regCode.exec(s)){
    conStr.push(content[1])
}
for(var i=0;i<conStr.length;i++){
    //代码换行处进行添加<br>
    s = s.replace(conStr[i],conStr[i].replace(/\n/g, "<br>"));
}
```
## 结语
处理结束后就可以把s放到页面了,试试效果，效果在这里[效果在这里][0]


[0]: http://loadingmore.com/v-markdown
[1]: http://www.jb51.net/tools/zhengze.html#mission
