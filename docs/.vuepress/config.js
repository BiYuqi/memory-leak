const devops = require('./devops')

module.exports = {
  base: '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, '../assets')
      }
    }
  },
  title: '在路上',
  description: 'Road of front-end growth',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '前端工程化', link: '/frontend-engineering/' },
      { text: 'Node实战', link: '/node-practice/' },
      { text: 'Devops实践', link: '/devops-practice/' },
      { text: '可视化实践', link: '/visualization-practice/' },
      { text: 'Github', link: 'https://github.com/BiYuqi/memory-leak' },
    ],
    sidebar: {
      '/blog/': [],
      '/frontend-engineering/': [],
      '/node-practice/': [],
      '/devops-practice/': devops,
      '/visualization-practice/': []
    }
  },
  lastUpdated: 'Last Updated'
}