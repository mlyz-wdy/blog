# 10分钟使用VitePress + 自动部署github pages 建立自己的博客

[VitePress 中文文档地址](https://xxy5.com/vitepress-cn/config-app.html#appearance)
[VitePress 英文文档地址](https://vitepress.dev/)

## 1. github 创建一个仓库，blog
## 2. clone 到本地
## 3. 初始化 VitePress
**注：因我用的pnpm安装，如果大家也想用，先执行 `npm i pnpm -g` 安装一下
1. 进入仓库执行
	
    ```
    pnpm init
    ```
2. 安装需要的依赖
	
    ```
    --dev vitepress vue
    ```

3. 写入第一个文档
	
    ```
    mkdir docs && echo '# Hello VitePress' > docs/index.md
    ```
4. 在 `page.json` 加入执行脚本
	
    ```json
    {
        ...
        "scripts": {
            "docs:dev": "vitepress dev docs",
            "docs:build": "vitepress build docs",
            "docs:serve": "vitepress serve docs"
        },
        ...
    }
   ```
5. 在本地开启服务
    ```
    pnpm docs:dev
    ```
## 4. 配置VitePress
1. 文件结构
    ```
    .
    ├─ .github // 部署相关，后面会说
    │  ├─ workflows
    │  │  ├─ deploy.yml
    ├─ docs
    │  ├─ .vitepress
    │  │  ├─ config.js // 打包配置的文件
    │  ├─ articles // 文章的文件夹
    │  │  ├─ javascript-core // JavaScript核心文章
    │  │  └─ ...
    │  ├─ public // 这里可以放入全局文件内容，打包后原样复制到dist
    │  │  ├─ images // 文章中的图片
    └─ package.json
    ```
2. config.js 配置

    以下内容都有注释，大家根据自己情况增减，官方文档也非常清楚
    ```js
    export default {
        title: '码路芽子', // 博客的标题
        description: 'mlyz 的个人博客', // 博客的介绍
        base: '/blog/', // 如果想用 https://mlyz.wdy.github.io/blog/ 访问，那么这句话必填
        themeConfig: {
            logo: "/images/logo.png", // 页面上显示的logo
            nav: [ // 页面右上角的导航
                { text: "vue", link: "/articles/vue/上传素材到COS" },
                { text: "uniapp", link: "/articles/uniapp/一键登录" },
                {
                    text: '博客文档',
                    items: [ // 可以配置成下拉
                        { text: 'JavaScript 核心系列', link: '/articles/javaScript-core/构造函数、原型、原型链' },
                        { text: 'Vue 三方组件库', link: '/articles/libs/VForm3低代码初体验' },
                        { text: '其他', link: '/articles/other/nvm管理node' },
                    ]
                }
            ],
            sidebar: { // 侧边栏，可以分组
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
            },
            socialLinks: [{ icon: "github", link: "https://github.com/mlyz-wdy" }], // 可以连接到 github
        },
    }
    
    ```

## 5. 上传到 github 自动部署

在 `.github/workflows/deploy.yml` 中
```yml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm i pnpm -g
      - run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm docs:build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

以上内容可以直接复制使用，如果想修改，可以看文档自行修改

1. 在上传到github中，就会自己执行actions



执行状态可以自行查看

2. 完成之后会在分支中，新增一个分支


3. 在 settings/pages 中更换源为 gh-pages


::: tip
此时完成了，大家可以看看自己部署的博客了
:::

**我反正用了不止10分钟，毕竟还要研究，但你们看到这么清晰的文章，我觉得10分钟足够了，如果超过了，你们反思一下，我哪里写的不清楚，我改还不行么**

::: danger
我觉得你们一定会报错，如果没报错当我没说
:::

**GitHub Action: The process ‘/usr/bin/git‘ failed with exit code 128**

