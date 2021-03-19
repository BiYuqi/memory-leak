---
title: 如何在一个项目里使用两种版本的npm包
tag: [npm]
date: 2021-03-19
---

## 背景
实际项目开发中, 经常会遇到引用的某个npm包更新了, 跑过去一看, 非兼容性更新, 心情凉了半截,不着急，现在我们有方案来解决这个问题了(其实一直有,是我不知道而已)

## 方法
npm 或者yarn 提供了命令让我们对一个包重新起个别名, 这样我们在升级的时候，先把旧包起个别名,再下载新包进行迁移, 简直不要太爽

```sh
# 先给旧包起个别名(这一步改完后,需要手动替换项目中的引用后方可安装新包)
npm install my-sdk-old@npm:my-sdk@1
# 下载新包
npm install my-sdk
```

**插曲: **
> 如果给旧包起完别名后, 还需要替换文件中的引用, 全部改完后, 方可安装新版本
```js
import { debounce } from "my-sdk"

// 替换为
import { debounce } from "my-sdk-old"
```

package.json 会变为如下:
```sh
"dependencies": {
  "my-sdk-old": "pm:my-sdk@1.0.0",
  "my-sdk": "2.0.0"
}
```

至此我们的问题已经解决了. 如果升级完毕，可以删除了旧包, 或者两者共存也行

## 注意事项
如果你的项目使用的事yarn, 请把上述命令汇总涉及到的npm改为yarn即可. e.g. `yarn add my-sdk-old@yarn:my-sdk@1`