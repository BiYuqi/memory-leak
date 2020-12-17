const path = require('path')
const devops = require('./devops')
const blog = require('./blog')
const visual = require('./visualization-practice')
const building = require('./building')

const config = {
  base: '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, '../assets')
      }
    }
  },
  title: 'On the way',
  description: 'Road of Front-End Growth',
  theme: 'reco',
  themeConfig: {
    noFoundPageByTencent: false,
    smoothScroll: true,
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
      '/blog/': blog,
      '/frontend-engineering/': building,
      '/node-practice/': [],
      '/devops-practice/': devops,
      '/visualization-practice/': visual
    },
    record: '陕ICP备20010208号',
    recordLink: 'http://www.beian.miit.gov.cn/',
    cyberSecurityRecord: '陕公网安备61011302001023号',
    cyberSecurityLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61011302001023',
    startYear: '2017'
  },
  lastUpdated: 'Last Updated'
}

if (process.env.NODE_ENV === "production") {
  config.head = [
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?3e0dd808fcb276feef04ab61d602df5e";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    `]
  ]
}

module.exports = config
