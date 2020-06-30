---
title: 服务器登录配置
date: 2020-06-29
sidebar: 'auto'
---

首先, 买了服务器后要登录, 例如我购买的是阿里云的服务器，提供的有云端的命令行工具, 但是最方便的还是用终端, 使用`ssh`命令行登录:

本文记录下我的服务器登录之旅.

0. 登录服务器
1. 快速登录: 配置客户端 ssh-config
2. 免密登录: 配置 public key
3. 保持连接：控制ssh不被断开

## 登录服务器
下面的用户名是你服务器的用户名`root`, ip是你的云服务器公网的ip地址, 但是记录ip地址实在是让人备受折磨, 我们可以通过 ssh-config来配置我们的ip以便实现快速登录

```bash
ssh 用户名@ip
```

## 快速登录
在命令行查看是否本地有ssh cofnig, 我们可以起别名进行快速登录
```bash
ls ~/.ssh/config
```

如果没有，则创建即可
```bash
touch ~/.ssh/config
```

下面是我个人服务器的配置
```bash
# 修改  ~/.ssh/config

Host leak
    HostName 123.56.222.243
    User root
```
> 使用vim后键入 i 是编辑模式, ESC退出编辑，:wq保存并且关闭文件

这个时候我们可以不用再输入长长的ip地址，只需要
```bash
ssh leak
```
便会提示输入密码, 完了登录就可以了.

```bash
~ » ssh leak
root@123.56.222.243's password:
Last login: Mon Jun 29 20:21:10 2020 from 113.138.33.112

Welcome to Alibaba Cloud Elastic Compute Service !

[root@loadingmore ~]#
```

## 免密登录
现在我们可以比较方便的登录我们的服务器了，但是还有个困扰，就是每次输入长长的密码. 那么能不能免密码登录呢？

答案就是我们今天的主角: public-key & ssh-copy-id, 原理就是通过ssh-copy-id这个工具 把我们本地的秘钥放到服务器上.

public-key就是我们本地的 `~/.ssh/id_rsa.pub` 对应服务器的就是 `~/.ssh/authorized_keys`

ssh-copy-id是linux的工具, 专门干这事的

```bash
# 本地终端操作

# 该步骤会提示输入密码, 成功后可免密登录服务器
ssh-copy-id leak

# 成功后, 键入以下命令即可登录服务器
ssh leak 
```

## 保持连接
此刻已经能免密登录服务起来, 但是看个新闻的功夫，再次切到命令行，发现无响应，卡死了.
原来是服务器自动断掉了，查阅资料发现可以配置保持连接的命令, 在客户端ssh的config加如下命令

```bash
Host *
  ServerAliveInterval 60
```