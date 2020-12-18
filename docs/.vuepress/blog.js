const addPrefix = require('./utils/prefix')

module.exports = [
  {
    title: '说明',
    collapsable: false,
    children: [
      ['', '说明'],
    ]
  },
  {
    title: '正则',
    collapsable: true,
    children: [
      ['regexp-start', '入门篇'],
      ['regexp-pattern', '贪婪与非贪婪模式'],
      ['regexp-money', '阿拉伯数字千分位用逗号分隔'],
      ['regexp-highlight', '正则实现代码高亮'],
      ['regexp-validate', '正则表达式必须包含数字和字母两种组合'],
      ['regexp-record', '从今天起写的每条正则都记录在册'],
      ['regexp-tips-one', '每隔四个字符添加一个空格的正则怎么写'],
      ['regexp-tips-two', '一个有点意思的正则'],
      ['regexp-parse-url', '写个正则匹配url参数的字典-方便提取查询参数'],
      ['regexp-capitalize-first-letter', '正则匹配字符串英文首字母小写转大写']
    ].map(item => {
      return addPrefix(item, 'regexp')
    })
  },
  {
    title: "Javascript",
    collapsable: true,
    children: [
      ['js-localstorage', '浅谈LocalStorage响应事件'],
      ['js-combine-url', '如何优雅的拼接url之GET请求参数'],
      ['you-don-not-know-js-type', '你不知道的Javascrsipt中JS宽松相等和严格相等'],
      ['web-dom-select', '来看看select是个什么东东'],
      ['js-math-random', '浅析js随机数Math.random()'],
      ['js-mobile-letter-list', '实现一个移动端字母导航索引'],
      ['js-form-check', '学习下如何优雅的写表单验证'],
      ['js-formdata-upload', '一次FormData递归上传图片小记'],
      ['js-get-css', 'JavaScript获取CSS样式遇到的一些问题'],
      ['js-native-ajax', '原生js实现类似于Jquery的ajax请求方式'],
      ['web-disable-space', '输入框禁止输入空格']
    ].map(item => {
      return addPrefix(item, 'js')
    })
  },
  {
    title: 'Git技巧',
    collapsable: true,
    children: [
      ['git-notes', 'Git问题备忘录'],
      ['git-clone-specify-branch', 'Git如何克隆指定分支'],
      ['git-change-old-commit', 'Git如何修改老旧commit的message'],
      ['git-change-new-commit', 'Git如何修改最新commit的message'],
      ['git-rename-local-remote-branch', 'Git重命名本地分支名和远程分支名'],
      ['git-reorder-commit', 'Git如何修改commit提交顺序'],
      ['git-merge-commit', 'Git合并多个commit']
    ].map(item => {
      return addPrefix(item, 'git')
    })
  },
  {
    title: 'Vue',
    collapsable: true,
    children: [
      ['vue-clipboard', 'Vue实用js快速复制文本内容']
    ].map(item => {
      return addPrefix(item, 'vue')
    })
  },
  {
    title: 'Tools',
    collapsable: true,
    children: [
      ['collect-usefull-npm-package', '收集一些有趣常用的npm包']
    ].map(item => {
      return addPrefix(item, 'tools')
    })
  },
  {
    title: 'Other',
    collapsable: true,
    children: [
      ['look-forward-2017', '2017, 就这样来了'],
      ['move-hexo', '换电脑后-如何完美迁出hexo博客'],
      ['nvm-in-compatible', 'mac使用nvm提示不兼容的前缀']
    ].map(item => {
      return addPrefix(item, 'other')
    })
  }
]
