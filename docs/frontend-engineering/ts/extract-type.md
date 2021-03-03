---
title: 编写Typescript应用, 如何自动聚合types
tag: [Typescript, typescript]
date: 2021-01-11
---

### 前言

相信大家开发基于typescript的npm库的时候,免不了要为项目编写type文件,对于刚写ts的人来说还是比较吃力的(与我而言),虽然配置tsconfig.json可以帮助我们自动生成对应的type文件，但是这些type文件都是有层级的.

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
  index.esm.js
```

而我们的目的是生成一个index.d.ts文件, 而不是这样散乱的结构,不便于类型提示.

**期待的编译**

本文`tsconfig.json`中 `compilerOptions`的`module`不为`commonjs`时:

[演示仓库配置](https://github.com/ifakejs/extract-ts-types/blob/master/tsconfig.json#L7)
```js
dist
  index.d.ts 
  index.min.js 
```

### 转机
功夫不负有心人(感谢万能的开源社区), 被我找到了微软官方开源的一个工具,可以帮助我们进行提取类型文件. 

官网开头如是介绍:
> API Extractor helps you build better TypeScript library packages.....
- [@microsoft/api-extractor Docs](https://api-extractor.com/)
- [NPM Package](https://www.npmjs.com/package/@microsoft/api-extractor)

### 开始

我们的演示仓库地址: [extract-ts-types](https://github.com/ifakejs/extract-ts-types)

首先我们基于脚手架[pkg](https://github.com/ifakejs/pkg)创建一个基于`rollup` + `typescript`的项目

**项目结构**
```sh
extract-ts-types
├── __test__
│   └── index.spec.ts
├── src
│   ├── index.ts
│   └── utils
        ├── chunk.ts
        ├── flatten.ts
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .prettierrc.js
├── LICENSE
├── api-extractor.json # 下面的命令将会配置该选项
├── babel.config.js
├── jest.config.js
├── package.json
├── rollup.config.js
├── tsconfig.json
├── tsconfig.type.json # 需要手动创建
└── yarn.lock
```

### 为生成类型创建新的tscofnig文件
文件`tsconfig.type.json`专门用来生成类型文件, tsconfig.json本身不生产类型文件即: 不配置`declaration`
```sh
{
  "extends": "./tsconfig.json", # 继承
  "compilerOptions": {
    "declaration": true,
    "outDir": "./temp",
    "emitDeclarationOnly": true
  }
}
```

### 安装插件
**在我们的演示项目安装如下插件:**

```sh
yarn add @microsoft/api-extractor -D
```

**项目根目录创建配置文件:**

```sh
touch api-extractor.json
```

**内容如下:**
```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
  "projectFolder": ".",
  /* 重点关注 */
  "mainEntryPointFilePath": "./temp/src/index.d.ts",
  "apiReport": {
    "enabled": true,
    "reportFolder": "<projectFolder>/temp/"
  },
  "docModel": {
    "enabled": true
  },
  "dtsRollup": {
    "enabled": true,
    /* 重点关注 */
    "untrimmedFilePath": "./lib/index.d.ts"
  },
  "tsdocMetadata": {
    "enabled": false
  },
  "messages": {
    "compilerMessageReporting": {
      "default": {
        "logLevel": "warning"
      }
    },
    "extractorMessageReporting": {
      "default": {
        "logLevel": "warning",
        "addToApiReportFile": true
      },
      "ae-missing-release-tag": {
        "logLevel": "none"
      }
    },
    "tsdocMessageReporting": {
      "default": {
        "logLevel": "warning"
      },
      "tsdoc-undefined-tag": {
        "logLevel": "none"
      }
    }
  }
}
```

我们看到上文json文件中有两个重点关注的字眼, 我们主要配置的地方也是该处.

- `mainEntryPointFilePath: "./temp/src/index.d.ts"` 顾名思义该字段定义临时的类型文件输出位置, 该位置会临时创建一个`temp`文件夹,
我们的类型文件会打包到这个地方

- `"untrimmedFilePath": "./lib/index.d.ts"` 这个配置是配置最终输出的目标位置, 这里我们只为`esm`生成类型文件，所以配置的是`lib`

**编译类型的过程**

执行tsc生成类型文件 `->` 执行api-extractor命令 `->` 删除临时文件`temp`. 即在package.json scripts添加一行:
```sh
"build:types": "tsc -p tsconfig.type.json && api-extractor run && rimraf ./temp"
```

### 总结
如果要提取所有的类型，我们要做一下事情:

`rimraf` 记得安装

- 安装提取插件`@microsoft/api-extractor`
- 配置插件`api-extractor.json`
- 插件类型文件`tsconfig.type.json`
- 配置命令 `"build:types": "tsc -p tsconfig.type.json && api-extractor run && rimraf ./temp"`

