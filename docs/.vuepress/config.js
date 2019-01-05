module.exports = {
  title: 'Netlify CMS + VuePress',
  description: 'Netlify + VuePress',
  themeConfig: {
    docsDir: 'docs',
    repo: 'john-l-hansen/vuepress-netlify-cms',
    sidebar: [
      '/',
      '/welcome',
      '/test'
    ],
    nav: [
      {
        text: 'Admin',
        link: '/admin/#/',
      }
    ]
  }
}