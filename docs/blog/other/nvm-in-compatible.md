---
title: mac使用nvm提示不兼容的前缀
date: 2020-12-16 23:31
tags: [nvm, nodejs]
---

> mac电脑安装nvm来管理node版本时遇到的问题

`
nvm is not compatible with the npm config "prefix" option: currently set to "/usr/local" Run "npm config delete prefix" or "nvm use --delete-prefix v14.15.0 --silent" to unset it.
`

### 解决方法
注意: 使用错误消息中指示的版本号更改版本号. 我的提示的是14.15.0, 所以我更改如下


```sh
$ npm config delete prefix
# v14.15.0 根据需要进行设置
$ npm config set prefix $NVM_DIR/versions/node/v14.15.0
```

[参考](https://github.com/creationix/nvm/issues/855#issuecomment-314309706)