---
title: Linux下离线安装node.js(详细)
date: 2020-09-24
---

> 最近需要内网工作，没有互联网. 所以需要离线安装nodejs, 所以总结此文

## 查看系统信息

> 是32位还是64位

```sh
uname -r
```

## 下载Nodejs离线
nodejs.cn/download/

直接下载对应版本位(`最新node稳定版是12.8.4， 截止到20200924`)
然后通过ftp上传到/usr目录下

## 解压重命名

- 进入usr目录
```sh
cd /usr
```

- 解压node的包
```shell
tar -xvf node-v12.18.4-linux-x64.tar.xz 
```

解压后的目录结构, 多了个`node-v12.18.4-linux-x64`目录

重命名改名为nodejs

```sh
mv node-v12.18.4-linux-x64 nodejs 
```

## 建立软连接

> 让node npm变为全局环境变量
```sh
ln -s /usr/nodejs/bin/npm /usr/local/bin/
ln -s /usr/nodejs/bin/node /usr/local/bin/
```


## 测试是否安装成功
```
node -v
```
```
v12.18.4
```

本文完.