---
title: 学习下如何优雅的写表单验证
date: 2017-05-14 19:44:53
tags: [form]
categories: Javascript
---
> 最近项目挺赶,博客许久没更新(借口~),周末充下电,表单是一个项目中必不可少的模块了，像注册，登录等。学习下解决下工作中关于表单验证这块的问题

### DEMO
demo源码可能与博客有些略微不同(但是核心思想一模一样)
[线上案例](http://loadingmore.com/demo/src/html/form-opt.html)

### 问题
看看平时我写表单的代码风格吧(求轻喷~)
```javascript
if(userName.value === ''){
    console.log("姓名不为空");
    return;
}
if(!reg.test(userName.value)){
    console.log("姓名不合格");
    return;
}
if(userPass.value === ''){
    //.........
}
if(userPass.value !=== reUserPass.value){
    console.log("密码不一致");
    return;
}
if(mobile.value === ''){
    console.log("手机号码不能为空");
    return;
}
//此处略去n多if-esle
```
这样编写代码对于实现业务需求来说是没有问题的，但是总觉得哪里怪怪的:
> * 我有密集恐惧症，那么多的if-else看着怪恶心的
* 验证的规则复用性太差了,哪里需要，只是拷贝来，粘贴过去,飞来飞去
* 这样的代码容易被喷，不容易维护

### 怎么解决呢
假如我们不想使用那么多的if语句，那么你心中理想的验证表单的方式是什么呢？写一系列规则，最后一步验证，这样写起来很嗨吧
```javascript
// 首页获取form元素
var registerForm = document.querySelector('#re-form');

// 创建实例
var validator = new Validator();

validator.add(registerForm.userName,'isEmpty','用户名不能为空');
validator.add(registerForm.userPass,'minLength:6','密码至少六位');

//校验信息
var errorMsg = validator.start();

if(errorMsg){
    console.log(errorMsg);
}
```
如果能这样写那就太爽了,很优雅,很方便,下一步需要了解下什么是策略模式

### 策略模式
所谓策略就是做事情的方法,好比玩三国杀，每个人都有自己的技能，每个人物都有自己的制胜策略;比如去旅游,就有很多种路线供你选择，要么坐飞机，要么坐高铁，要么徒步;

所以，做一件事情会有很多种方法,接下来编码也会以这种方式进行;核心思想是，将要做什么和谁去做进行分离。一个完整的策略需要两个类：策略类,环境类;环境类接收请求，但不处理请求，它会把请求委托给策略类，让策略类去处理，而策略类的扩展是很容易的，这样，使得我们的代码易于扩展。
在表单验证的例子中，各种验证的方法组成了策略类，比如：判断是否为空的方法(如：isNonEmpty)，判断最小长度的方法(如：minLength)，判断是否为手机号的方法(isMoblie)等等，他们组成了策略类，供给环境类去委托请求。下面，我们就来实战一下。
### 策略类
```javascript
// 完成我们的策略表 (自由定制)
var ruleList = {
    //验证为空
    isEmpoty: function(value,errorMsg){
        if(value == ''){
            return errorMsg;
        }
    },
    //验证最小长度
    minLength: function(value,len,errorMsg){
        if(value.length < len){
            return errorMsg;
        }
    },
    //验证手机号
    isMobile: function(value,errorMsg){
        if(!/^1\d{10}$/.test(value)){
            return errorMsg;
        }
    }
};
```
### 环境类
根据之前的畅想：
```js
validator.add(registerForm.userName,'isEmpty','用户名不能为空');
validator.add(registerForm.userName,'isMobile','手机号码有误');
```
我们可能需要创建一个类，类里面有两个方法 add()add()接收三个参数，第一个是表单字段(校验对象),第二个是策略方法名字,使用冒号(:)分隔，亲一个是方法名字，后一个是传给该方法的参数(如长度),第三个是验证不通过的返回信息;
然后用start方法进行验证：
```js
var errorMsg = validation.start();
```
但是这种参数配置还是有问题，我们的要求是多种校验规则，比如用户名既不能为空，又要满足用户名长度不小于6，并不是单一的，上面的为什么要写两次，这种看着就不舒服，这时候我就需要对配置参数做一点小小的改动，我们用数组来传递多个校验规则：
```js
//最终实现
validator.add(registerForm.username, [{
    strategy: 'isEmpty',
    errorMsg: '用户名不能为空！'
}, {
    strategy: 'minLength:6',
    errorMsg: '用户名长度不能小于6位！'
}])
```

### 实现
```js
var FormValidator = function(ruleList){
    //保存策略规则列表
    this.strategies = ruleList;
    //储存规则方法
    this.validationFns = [];
};
FormValidator.prototype = {
    add:function(dom,rule){
        var that = this;
        for(var i=0;i<rule.length;i++){
            // 这里使用闭包储存i 动态添加方法
            (function(i){
                //
                that.validationFns.push(function(){
                    /*
                    * aryNames 规则名字(包含传的参数minLeng:6) 所以需要动态的解析
                    * errorMsg 错误信息
                    * rulename 方法名字
                    * dataArr 储存参数 value method名字 错误信息
                    * strategies 使用apply 向指定方法传参数
                     */
                    var aryNames = rule[i].strategy.split(':'),
                        errorMsg = rule[i].errorMsg,
                        rulename = aryNames[0],
                        dataArr = [];
                        dataArr.push(dom.value);
                        if(aryNames[1]){
                            dataArr.push(aryNames[1]);
                        }
                        dataArr.push(errorMsg);
                    return that.strategies[rulename].apply(dom,dataArr);
                })
            })(i)
        }
    },
    start:function(){
        var that = this;
        // 遍历规则集合 抛出错误
        for(i in that.validationFns){
            var msg = that.validationFns[i]();
            if(msg){
                return msg;
            }
        }
    }
};
```
** 规则集合**
```js
// 规则集合
var rules = {
    //验证为空
    isEmpoty: function(value,errorMsg){
        if(value == ''){
            return errorMsg;
        }
    },
    //验证最小长度
    minLength: function(value,len,errorMsg){
        if(value.length < len){
            return errorMsg;
        }
    },
    //验证手机号
    isMobile: function(value,errorMsg){
        if(!/^1\d{10}$/.test(value)){
            return errorMsg;
        }
    }
};
```
** 客户端调用代码方法**
```html
<form id="submit">
    <input type="text" class="username" name="username">
    <input type="text" class="userpass" name="userpass">
</form>
<div class="btn">提交</div>
```
```js
var forms = document.querySelector('#submit');
var btn = document.querySelector('.btn');

// 构造函数 传入规则
var validation = new FormValidator(rules);
// 直接调用规则方法即可 返回错误信息
function getErrorMsg(){
    // 直接调用规则方法即可
    validation.add(forms.username,[
        {
            strategy:'isEmpoty', //strategy 为固定字段
            errorMsg:'用户名不能为空' //errorMsg 为固定字段
        },
        {
            strategy:'minLength:6',
            errorMsg:'用户名长度最低6位'
        }
    ]);
    validation.add(forms.userpass,[
        {
            strategy:'isMobile',
            errorMsg:'手机号码有误'
        }
    ]);

    var error = validation.start();
    return error;
}
// 点击事件
btn.addEventListener('click',function(){
    var msg = getErrorMsg();
    if(msg){
        console.log(msg)//错误提示
    }else{
        //在此提交数据
    }
},false)
```
在修改某个校验规则的时候，只需要编写或者改写少量的代码。比如我们想要将用户名输入框的校验规则改成用户名不能少于4个字符。可以看到，这时候的修改是毫不费力的。代码如下：
```js
// 更具体的方法 可以在rules中修改
validation.add(forms.username, [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空！'
    }, {
        strategy: 'minLength:4',
        errorMsg: '用户名长度不能小于4位！'
    }])
```
参考：
[策略模式在表单中的应用](http://hcysun.me/2016/02/21/%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F%E5%9C%A8%E8%A1%A8%E5%8D%95%E9%AA%8C%E8%AF%81%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8/
)
