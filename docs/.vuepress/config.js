module.exports = {
  title: 'Documentation Portal',
  description: 'A collection of information designed to help understand the actv8me product suite.',
  themeConfig: {
    docsDir: 'docs',
    repo: 'john-l-hansen/vuepress-netlify-cms',
    sidebar: [
      '/',
      '/welcome',
      '/campaigns', 'Campaigns',
      // '/triggers',
      // '/content',
      // '/categories',
      // '/tags',
      // '/settings/',
      // '/support'
    ],
    nav: [
      {
        text: 'Admin',
        link: '/admin/',
      }
    ]
  }
}