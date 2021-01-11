---
title: 编写Typescript应用, 如何自动聚合types
tag: [Typescript, typescript]
date: 2021-01-11
---

## 前言

相信大家开始写typescript代码的时候,大概率免不了要为项目编写type文件,对于刚写ts的人来说还是比较吃力的(与我而言),虽然配置tsconfig.json可以帮助我们自动生成对应的type文件，但是这些type文件都是有层级的.

**Source Code**
```js
- src
  - utils
    - chunk.ts
    - pick.ts
  index.ts  
```

**经过Compiled Code**
```js
dist
 - src
  - utils
    - chunk.d.ts
    - pick.d.ts
  index.d.ts  
```

而我们的目的是生成一个index.d.ts文件, 而不是这样散乱的结构,不便于类型提示.

**期待的编译**
```js
dist
  index.d.ts 
  index.min.js 
```

## 转机
功夫不负有心人(感谢万能的开源社区), 被我找到了微软官方开源的一个工具,可以帮助我们进行提取类型文件. 

官网开头如是介绍:
> API Extractor helps you build better TypeScript library packages.....
- [@microsoft/api-extractor Docs](https://api-extractor.com/)
- [NPM Package](https://www.npmjs.com/package/@microsoft/api-extractor)

## 开始

我们的演示仓库地址: [extract-ts-types](https://github.com/ifakejs/extract-ts-types)

首先我们基于脚手架[pkg](https://github.com/ifakejs/pkg)创建一个基于`rollup` + `typescript`的项目

