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
      ['regexp-validate', '正则表达式必须包含数字和字母两种组合']
    ]
  },
  {
    title: "Javascript",
    collapsable: true,
    children: [
      ['js-localstorage', '浅谈LocalStorage响应事件'],
      ['js-combine-url', '如何优雅的拼接url之GET请求参数']
    ]
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
    ]
  },
  {
    title: '其他技巧',
    collapsable: true,
    children: [
      ['move-hexo', '换电脑后-如何完美迁出hexo博客'],
    ]
  }
]