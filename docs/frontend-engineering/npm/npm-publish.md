---
title: NPM安装发布更新撤销包
tag: [npm]
date: 2020-12-17
---

## 什么是npm?
- npm是Node.js的包管理器。它创建于2009年，作为一个开源项目，帮助JavaScript开发者轻松分享打包后的代码模块。
- npm Registry是Node.js、前端Web应用、移动应用、机器人、路由器以及JavaScript社区无数其他需求的开源代码包的公共集合。
- npm是允许开发者安装和发布这些包的命令行客户端。
- [官方解释](https://www.npmjs.com/about)

## npm安装依赖包
npm是在安装nodejs的时候一起捆绑安装的,可在命令行输入以下命令查看版本
```js
npm -v
```

#### npm项目依赖本地安装和全局安装
当你尝试使用一些脚手架，例如vue-cli create-react-app 这类工具时，需要全局安装
- 全局安装的方式: `npm install -g <package-name>`
- 本地安装又分为项目依赖和开发依赖
    - 顾名思义项目依赖就是项目本身要用到的，而且要打包到一起的依赖 执行`npm install <package-name> -S`,
`-S` 代表依赖会被安装到package.json的dependencies中
    - 而开发依赖就比如像webpack, sass-loader之类的只有在开发时用到，项目打包后的文件不包含, 所以安装为开发依赖. 执行 `npm i webpack -D`,
`-D` 代表依赖会被安装到package.json的devDependencies中

总结下: 
- `npm install <package-name>` 安装好后不写入package.json中
- `npm install <package-name>` -S 安装好后写入package.json的dependencies中（生产环境依赖）
- `npm install <package-name>` -D 安装好后写入package.json的devDepencies中（开发环境依赖）

## 通过npm删除依赖包
- 删除全局模块
```sh
npm uninstall -g <package-name>
```

**本地模块**
- 删除模块，同时删除模块留在package.json中dependencies下的对应信息
```shell script
npm uninstall <package-name> --save 
```

- 删除模块，同时删除模块留在package.json中devDependencies下的对应信息
```sh
npm uninstall <package-name> -D
```

## npm发布包
> 发布npm需要有账号

- 第一次发布包：
在终端输入`npm adduser`，提示输入账号，密码和邮箱，然后将提示创建成功

- 非第一次发布包：
在终端输入`npm login`，然后输入你创建的账号和密码，和邮箱，登陆
注: `npm adduser`成功的时候默认你已经登陆了，所以不需要再接着`npm login`.

包的名称和版本就是你项目里package.json里的`name`和`version`！

#### 注意事项
- 不能和已有的包的名字重名！否则会发布失败
- 包名不能有大写字母, 空格, 下滑线
- 你的项目里有部分私密的代码不想发布到npm上？
  - 写入`.npmignore`或者`.gitignore`
  - 指定package.json中的`files`字段，支持接收一个数组，需要发布的文件
```json
"files": [
  "dist"
]
```
代表除了基本信息会默认上传(package.json README.md)外, 会把dist目录也会上传
## npm撤销发布的包

```shell script
npm unpublish <package-name> --force
```

`npm unpublish`的推荐替代命令：`npm deprecate <package-name>[@<version>] <message>`
使用这个命令，并不会在社区里撤销你已有的包，但会在任何人尝试安装这个包的时候得到警告
例如：`npm deprecate <package-name> '很遗憾, 这个包我已经不再维护了～'`

## npm更新发布后的包

步骤是：
- 1.修改包的版本（package.json里的version字段）
- 2.`npm publish`

Npm有自己的版本控制标准—Semantic versioning（语义化版本）
具体体现为：

对于"version":"x.y.z"

- 1.修复bug,小改动，增加z
- 2.增加了新特性，但仍能向后兼容，增加y
- 3.有很大的改动，无法向后兼容,增加x
 
例如：我原本的项目是1.0.0版本的话
- 若是1中情况，变为1.0.1
- 若是2中情况，变为1.1.0
- 若是3中情况，变为2.0.0
 
通过`npm version <update_type>`自动改变版本
`update_type`为`patch`, `minor`, or `major`其中之一，分别表示补丁，小改，大改

```shell script
npm version patch

npm version minor

npm version major
```
## npm发布私有属性的包

如果需要发布免费的私有属性的包, 需要在package.json添加允许发布字段
```json
"publishConfig": {
  "access": "public"
}
```