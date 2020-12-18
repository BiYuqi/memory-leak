---
title: 介绍
date: 2020-07-16
---

:::warning
温馨提示: 本系列是翻译的官方workshop, 旨在学习OpenLayers, 如有不当烦请指出. [原地址](https://openlayers.org/workshop/en/)
:::

欢迎来到OpenLayer研讨会, 该系列旨在为您提供OpenLayers作为地图解决方案的全方位的了解。

## 启动

这些说明假设你使用的是最新发布的研讨会版本`openlayers-workshop-en.zip`. [workshop release](https://github.com/openlayers/workshop/releases).
另外, 你还需要准备nodejs的开发环境(version >= 8)来运行我们的研讨会项目.

当你解压文件之后, 进入到`openlayers-workshop-en`目录, 安装一些项目依赖.

```js
npm install

// or you can use yarn in you local
// yarn install
```

现在，你已经准备好了启动研讨会的服务了，该服务出来提供研讨会开发文件外，还提供了文档服务在3000端口 [workshop documentation](http://localhost:3000/doc/)

```js
npm start

// or you can use yarn in you local
// yarn start
```

这将启动开发服务器，您可以在其中阅读研讨会文档并完成练习, 您应该能够通过在[http://localhost:3000/](http://localhost:3000/)上看到警报来确认一切正常。
你可以阅读开发文档在[http://localhost:3000/doc/.](http://localhost:3000/doc/.)

## 大纲
该教程以一组模块的形式展示, 在每个模块中，您将执行旨在实现该模块特定目标的任务, 每个模块所需要的只是都来自于上一个模块，这是为了大家能够建立起你自己的知识图谱.

以下模块就是本教程包含的内容:

- [Basics](./ol-ws-basics.md) 学习如何将一个地图添加到页面
- Vector Data 处理矢量数据.
- Mobile Maps and Sensors 带GPS和指南针的移动地图.
- WebGL Rendering 使用WebGL渲染陨石撞击站点.
- Vector Tiles 使用矢量图块创建精美的地图.
- Raster Operations 使用栅格源操纵像素.
- Deploying 部署应用到生产环境.