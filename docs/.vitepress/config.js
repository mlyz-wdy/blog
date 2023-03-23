// .vitepress/config.js
export default {
    // site-level options
    title: '码路芽子',
    description: 'mlyz 的个人博客',
    base: '/blog/',
    themeConfig: {
        logo: "/images/logo.png",
        nav: [
          { text: "vue", link: "/articles/vue/上传素材到COS" },
          { text: "uniapp", link: "/articles/uniapp/一键登录" },
          {
            text: '博客文档',
            items: [
              { text: 'JavaScript 核心系列', link: '/articles/javaScript-core/构造函数、原型、原型链' },
              { text: 'Vue 三方组件库', link: '/articles/libs/VForm3低代码初体验' },
              { text: '其他', link: '/articles/other/nvm管理node' },
            ]
          }
        ],
        sidebar: {
            "/articles/vue/": [
              {
                text: "基础",
                items: [
                ],
              },
              {
                text: "代码段",
                items: [
                  {
                    text: "上传素材到COS",
                    link: "/articles/vue/上传素材到COS",
                  },
                  {
                    text: "文件下载",
                    link: "/articles/vue/文件下载",
                  },
                ],
              },
            ],
            "/articles/uniapp/": [
              {
                text: "基础",
                items: [
                ],
              },
              {
                text: "代码段",
                items: [
                  {
                    text: "一键登录",
                    link: "/articles/uniapp/一键登录",
                  }
                ],
              },
            ],
            "/articles/javaScript-core/": [
              {
                text: "基础",
                items: [
                  {
                    text: "1. 构造函数、原型、原型链",
                    link: "/articles/javaScript-core/构造函数、原型、原型链",
                  },
                  {
                    text: "2. 执行上下文和执行上下文栈",
                    link: "/articles/javaScript-core/执行上下文和执行上下文栈",
                  },
                  {
                    text: "3. this的指向",
                    link: "/articles/javaScript-core/this的指向",
                  },
                ],
              },
              {
                text: "进阶",
                items: [
                  {
                    text: "xx",
                    link: "/xx",
                  },
                ],
              },
            ],
            "/articles/libs/": [
              {
                items: [
                  {
                    text: "1. VForm3低代码初体验",
                    link: "/articles/libs/VForm3低代码初体验",
                  },
                ],
              }
            ],
            "/articles/other/": [
              {
                items: [
                  {
                    text: "使用VitePress建立自己的博客",
                    link: "/articles/other/使用VitePress建立自己的博客",
                  },
                  {
                    text: "nvm管理node",
                    link: "/articles/other/nvm管理node",
                  },
                  {
                    text: "VSCode常用插件推荐",
                    link: "/articles/other/VSCode常用插件推荐",
                  },
                ],
              }
            ],
          },
        socialLinks: [{ icon: "github", link: "https://github.com/mlyz-wdy" }],
      },
  }
  