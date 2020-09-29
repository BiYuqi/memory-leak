---
title: Linux下离线安装pm2
date: 2020-09-24
---

> 最近需要内网工作，没有互联网. 所以需要离线安装pm2运行node项目, 所以总结此文

## 安装pm2

先在一台能联网的机器上安装PM2

```sh
npm i pm2 -g
```

## 找到pm2源码

执行命令 npm config get prefix查看npm默认的全局安装目录

在该目录下的node_modules找到刚下载的pm2文件夹，上传到服务器的npm默认全局安装目录

```sh
[xxx node_modules]$ ls
npm  nrm  pm2
[xxx node_modules]$ tar czvf pm2.tar.gz pm2/
[xxx node_modules]$ ls
npm  nrm  pm2 pm2.tar.gz
```

## 下载并上传

下载刚才得到的pm2.tar.gz源码，并拷贝到内网服务器(假设拷贝到usr同级)

同样执行 npm config get prefix 看一下这台服务器的npm默认安装目录， 例如

```bash
$ npm config get prefix
/usr/nodejs
```

拷贝pm2到node_modules

解压

```bash
tar xvf pm2.tar.gz
```

```bash
cp -r ./pm2 /usr/nodejs/lib/node_modules
```
重新编译安装

```bash
cd /usr/nodejs/lib/node_modules

npm build pm2 -g
```

## 建立软连接

> 让pm2变为全局环境变量

```bash
ln -s /usr/nodejs/bin/pm2 /usr/local/bin/
```

## 验证
```bash
然后通过命令 pm2 -v检查是否安装成功!
```

