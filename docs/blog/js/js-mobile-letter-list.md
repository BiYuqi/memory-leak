---
title: 实现一个移动端字母导航索引
date: 2017-10-22 18:20:12
tags: [Javascript]
categories: Javascript
---

<!-- more -->
> 索引导航栏的效果在很多 APP 中都有应用,之前接触移动端页面开发较少，所以是边学边做，也就把这个过程中的一些东西整理记录下来。...

## 效果
[DEMO,浏览器请打开移动端调试查看具体效果](http://loadingmore.com/demo/src/html/index-slidebar/index-slidebar.html)
![](http://oq4hkch8e.bkt.clouddn.com/slideindex.gif)
[GITHUB代码](https://github.com/BiYuqi/demo/blob/master/src/html/index-slidebar/index-slidebar.html)

## 实现逻辑
主要分为三个步骤
* 渲染字母表
* 渲染页面数据
* 实现touch事件
![](http://oq4hkch8e.bkt.clouddn.com/indexslide-code.png)

## 解释几个函数
解释下moveTo2这个函数,主要目的就是根据touch事件返回的字母，与页面进行匹配，匹配成功后，用window.scrollTo指定跳转位置，
```js
moveTo2(letter) {
    const len = this.concatList.length
    for(let i=0;i<len;i++){
        // 匹配成功 即表示存在
        if(this.concatList[i].getAttribute('data-char') === letter){
            // this.concatList[i].offsetTop-this.offsetTop
            // 减去this.offsetTop 是为了减去header的高度，达到预期高度
            window.scrollTo(0,this.concatList[i].offsetTop-this.offsetTop)
        }
    }
}
```
此方法可返回touch时 所对应的索引是哪个字符,原理就是 this.letterWrap.clientHeight是字母列高度，除以字母数量得到是每个字母的高占比，再用当前touchY去除，得到当前位置的所占比例，取整即可得到当前索引
```js
getIndex(touchY) {
    // 可返回对应的模块索引
    return Math.floor((touchY-this.offsetTop) / (this.letterWrap.clientHeight / this.source.length))
}
```
touch事件，其中e.preventDefault()是为了阻止scroll事件
```js
touchStart() {
    this.letterWrap.addEventListener('touchstart',(e)=>{
        if(!this.touching){
            e.preventDefault()
            this.touching = true
            this.letterWrap.className += ' active'
            const touchY = e.touches[0].clientY
            const index = this.getIndex(touchY)
            this.showTips(index)
            this.moveTo2(this.source[index])
        }
    },false)
}

touchMove() {
    this.letterWrap.addEventListener('touchmove',(e)=>{
        if(this.touching){
            e.preventDefault()
            const touchY = e.touches[0].clientY
            const index = this.getIndex(touchY)
            this.showTips(index)
            this.moveTo2(this.source[index])
        }

    },false)
}

touchEnd() {
    this.letterWrap.addEventListener('touchend',()=>{
        if(this.touching){
            this.touching = false
            this.letterWrap.className = this.letterWrap.className.replace(/\s*active/,'')
            this.hideTips()
        }

    },false)
}
```
至此，基本功能已经实现，可以根据不同的需求进行改进，后期打算封装成为一个类库，对外暴露接口，这样更灵活些
