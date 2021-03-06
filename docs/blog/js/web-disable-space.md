---
title: 输入框禁止输入空格
date: 2017-04-11 19:18:38
tags: [正则, RegExp]
categories: Javascript
---
> 做表单验证，输入框经常要做判断,群里也经常看到有朋友问,所以做了下记录,自动过滤空格,

### DEMO
[DEMO][1]

<!-- more -->

### 实现原理
说下实现思路吧,其实就是监听输入框输入的类型,进行空格检测,正则一旦检测到空格,立即对当前值输入框进行赋值,赋值为过滤空格后的值
```html
<input type="text" class="test">
```

### 原生JS
```js
var input = document.querySelector('.test'),
    reg = /\s/;
input.oninput = function(){
    if(reg.test(this.value)){
        //过滤赋值
        input.value = this.value.replace(reg,'');
        return;
    }
}
```

### JQ版
```js
var input = $('.test'),
    reg = /\s/;
input.on('input',function(){
    var val = $(this).val();
    if(reg.test(val)){
        //过滤赋值
        input.val(val.replace(reg,''));
        return;
    }
}
```

### Vue版本


```html
<input type="text" class="test" v-model="message">
```
在Vue里面因为需要实时监听值得变化,所以需要在watch里面监听

```js
watch: {
    message: function() {
        const reg= /\s/;
        if(reg.test(this.message)){
            this.message = this.message.replace(reg,'');
            return;
        }
    }
}
```

[1]: http://loadingmore.com/demo/src/html/closespace.html
