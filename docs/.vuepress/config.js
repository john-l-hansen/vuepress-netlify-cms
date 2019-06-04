module.exports = {
  title: 'Documentation Portal',
  description: 'A collection of information designed to help understand the actv8me product suite.',
  themeConfig: {
    docsDir: 'docs',
    repo: 'john-l-hansen/vuepress-netlify-cms',
    sidebar: [
      '/',
      '/welcome',
      '/support',
      '/settings',
      '/tags',
      '/categories',
      '/triggers',
      '/campaigns',
      '/content'
    ],
    nav: [
      {
        text: 'Admin',
        link: '/admin/',
      }
    ]
  }
}