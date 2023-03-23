import{_ as s,c as n,o as a,N as l}from"./chunks/framework.9e118f14.js";const D=JSON.parse('{"title":"10分钟使用VitePress + 自动部署github pages 建立自己的博客","description":"","frontmatter":{},"headers":[],"relativePath":"articles/other/使用VitePress建立自己的博客.md"}'),p={name:"articles/other/使用VitePress建立自己的博客.md"},e=l(`<h1 id="_10分钟使用vitepress-自动部署github-pages-建立自己的博客" tabindex="-1">10分钟使用VitePress + 自动部署github pages 建立自己的博客 <a class="header-anchor" href="#_10分钟使用vitepress-自动部署github-pages-建立自己的博客" aria-label="Permalink to &quot;10分钟使用VitePress + 自动部署github pages 建立自己的博客&quot;">​</a></h1><p><a href="https://xxy5.com/vitepress-cn/config-app.html#appearance" target="_blank" rel="noreferrer">VitePress 中文文档地址</a><br><a href="https://vitepress.dev/" target="_blank" rel="noreferrer">VitePress 英文文档地址</a></p><h2 id="_1-github-创建一个仓库-blog" tabindex="-1">1. github 创建一个仓库，blog <a class="header-anchor" href="#_1-github-创建一个仓库-blog" aria-label="Permalink to &quot;1\\. github 创建一个仓库，blog&quot;">​</a></h2><h2 id="_2-clone-到本地" tabindex="-1">2. clone 到本地 <a class="header-anchor" href="#_2-clone-到本地" aria-label="Permalink to &quot;2\\. clone 到本地&quot;">​</a></h2><h2 id="_3-初始化-vitepress" tabindex="-1">3. 初始化 VitePress <a class="header-anchor" href="#_3-初始化-vitepress" aria-label="Permalink to &quot;3\\. 初始化 VitePress&quot;">​</a></h2><p><strong>注：因我用的pnpm安装，如果大家也想用，先执行 <code>npm i pnpm -g</code> 安装一下</strong></p><ol><li><p>进入仓库执行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm init</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>安装需要的依赖</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm i --dev vitepress vue</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>写入第一个文档</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">mkdir docs &amp;&amp; echo &#39;# Hello VitePress&#39; &gt; docs/index.md</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>在 <code>page.json</code> 加入执行脚本</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;docs:dev&quot;: &quot;vitepress dev docs&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;docs:build&quot;: &quot;vitepress build docs&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;docs:serve&quot;: &quot;vitepress serve docs&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>在本地开启服务</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm docs:dev</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li></ol><h2 id="_4-配置vitepress" tabindex="-1">4. 配置VitePress <a class="header-anchor" href="#_4-配置vitepress" aria-label="Permalink to &quot;4\\. 配置VitePress&quot;">​</a></h2><ol><li><p>文件结构</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">├─ .github // 部署相关，后面会说</span></span>
<span class="line"><span style="color:#A6ACCD;">│  ├─ workflows</span></span>
<span class="line"><span style="color:#A6ACCD;">│  │  ├─ deploy.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">├─ docs</span></span>
<span class="line"><span style="color:#A6ACCD;">│  ├─ .vitepress</span></span>
<span class="line"><span style="color:#A6ACCD;">│  │  ├─ config.js // 打包配置的文件</span></span>
<span class="line"><span style="color:#A6ACCD;">│  ├─ articles // 文章的文件夹</span></span>
<span class="line"><span style="color:#A6ACCD;">│  │  ├─ javascript-core // JavaScript核心文章</span></span>
<span class="line"><span style="color:#A6ACCD;">│  │  └─ ...</span></span>
<span class="line"><span style="color:#A6ACCD;">│  ├─ public // 这里可以放入全局文件内容，打包后原样复制到dist</span></span>
<span class="line"><span style="color:#A6ACCD;">│  │  ├─ images // 文章中的图片</span></span>
<span class="line"><span style="color:#A6ACCD;">└─ package.json</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>config.js 配置</p><p>以下内容都有注释，大家根据自己情况增减，官方文档也非常清楚</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    title: &#39;码路芽子&#39;, // 博客的标题</span></span>
<span class="line"><span style="color:#A6ACCD;">    description: &#39;mlyz 的个人博客&#39;, // 博客的介绍</span></span>
<span class="line"><span style="color:#A6ACCD;">    base: &#39;/blog/&#39;, // 如果想用 https://mlyz.wdy.github.io/blog/ 访问，那么这句话必填</span></span>
<span class="line"><span style="color:#A6ACCD;">    themeConfig: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        logo: &quot;/images/logo.png&quot;, // 页面上显示的logo</span></span>
<span class="line"><span style="color:#A6ACCD;">        nav: [ // 页面右上角的导航</span></span>
<span class="line"><span style="color:#A6ACCD;">            { text: &quot;vue&quot;, link: &quot;/articles/vue/上传素材到COS&quot; },</span></span>
<span class="line"><span style="color:#A6ACCD;">            { text: &quot;uniapp&quot;, link: &quot;/articles/uniapp/一键登录&quot; },</span></span>
<span class="line"><span style="color:#A6ACCD;">            {</span></span>
<span class="line"><span style="color:#A6ACCD;">                text: &#39;博客文档&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                items: [ // 可以配置成下拉</span></span>
<span class="line"><span style="color:#A6ACCD;">                    { text: &#39;JavaScript 核心系列&#39;, link: &#39;/articles/javaScript-core/构造函数、原型、原型链&#39; },</span></span>
<span class="line"><span style="color:#A6ACCD;">                    { text: &#39;Vue 三方组件库&#39;, link: &#39;/articles/libs/VForm3低代码初体验&#39; },</span></span>
<span class="line"><span style="color:#A6ACCD;">                    { text: &#39;其他&#39;, link: &#39;/articles/other/nvm管理node&#39; },</span></span>
<span class="line"><span style="color:#A6ACCD;">                ]</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        ],</span></span>
<span class="line"><span style="color:#A6ACCD;">        sidebar: { // 侧边栏，可以分组</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;/articles/vue/&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    text: &quot;基础&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    items: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    text: &quot;代码段&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    items: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                        {</span></span>
<span class="line"><span style="color:#A6ACCD;">                            text: &quot;上传素材到COS&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                            link: &quot;/articles/vue/上传素材到COS&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        },</span></span>
<span class="line"><span style="color:#A6ACCD;">                        {</span></span>
<span class="line"><span style="color:#A6ACCD;">                            text: &quot;文件下载&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                            link: &quot;/articles/vue/文件下载&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        },</span></span>
<span class="line"><span style="color:#A6ACCD;">                    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">            ],</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;/articles/uniapp/&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    text: &quot;基础&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    items: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    text: &quot;代码段&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    items: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                        {</span></span>
<span class="line"><span style="color:#A6ACCD;">                            text: &quot;一键登录&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                            link: &quot;/articles/uniapp/一键登录&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        }</span></span>
<span class="line"><span style="color:#A6ACCD;">                    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">            ],</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;/articles/javaScript-core/&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    text: &quot;基础&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    items: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                    {</span></span>
<span class="line"><span style="color:#A6ACCD;">                        text: &quot;1. 构造函数、原型、原型链&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        link: &quot;/articles/javaScript-core/构造函数、原型、原型链&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    },</span></span>
<span class="line"><span style="color:#A6ACCD;">                    {</span></span>
<span class="line"><span style="color:#A6ACCD;">                        text: &quot;2. 执行上下文和执行上下文栈&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        link: &quot;/articles/javaScript-core/执行上下文和执行上下文栈&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    },</span></span>
<span class="line"><span style="color:#A6ACCD;">                    {</span></span>
<span class="line"><span style="color:#A6ACCD;">                        text: &quot;3. this的指向&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        link: &quot;/articles/javaScript-core/this的指向&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    },</span></span>
<span class="line"><span style="color:#A6ACCD;">                    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    text: &quot;进阶&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    items: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                    {</span></span>
<span class="line"><span style="color:#A6ACCD;">                        text: &quot;xx&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        link: &quot;/xx&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    },</span></span>
<span class="line"><span style="color:#A6ACCD;">                    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">                },</span></span>
<span class="line"><span style="color:#A6ACCD;">            ],</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;/articles/libs/&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    items: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                    {</span></span>
<span class="line"><span style="color:#A6ACCD;">                        text: &quot;1. VForm3低代码初体验&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        link: &quot;/articles/libs/VForm3低代码初体验&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                    },</span></span>
<span class="line"><span style="color:#A6ACCD;">                    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">            ],</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        socialLinks: [{ icon: &quot;github&quot;, link: &quot;https://github.com/mlyz-wdy&quot; }], // 可以连接到 github</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li></ol><h2 id="_5-上传到-github-自动部署" tabindex="-1">5. 上传到 github 自动部署 <a class="header-anchor" href="#_5-上传到-github-自动部署" aria-label="Permalink to &quot;5\\. 上传到 github 自动部署&quot;">​</a></h2><p>在 <code>.github/workflows/deploy.yml</code> 中</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">name: Deploy</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">on:</span></span>
<span class="line"><span style="color:#A6ACCD;">  push:</span></span>
<span class="line"><span style="color:#A6ACCD;">    branches:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - main</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">jobs:</span></span>
<span class="line"><span style="color:#A6ACCD;">  deploy:</span></span>
<span class="line"><span style="color:#A6ACCD;">    runs-on: ubuntu-latest</span></span>
<span class="line"><span style="color:#A6ACCD;">    steps:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - uses: actions/checkout@v2</span></span>
<span class="line"><span style="color:#A6ACCD;">      - uses: actions/setup-node@v3</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          node-version: 16</span></span>
<span class="line"><span style="color:#A6ACCD;">      - run: npm i pnpm -g</span></span>
<span class="line"><span style="color:#A6ACCD;">      - run: pnpm install --frozen-lockfile</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Build</span></span>
<span class="line"><span style="color:#A6ACCD;">        run: pnpm docs:build</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Deploy</span></span>
<span class="line"><span style="color:#A6ACCD;">        uses: peaceiris/actions-gh-pages@v3</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          github_token: \${{ secrets.GITHUB_TOKEN }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          publish_dir: docs/.vitepress/dist</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>以上内容可以直接复制使用，如果想修改，可以看文档自行修改</p><ol><li><p>在上传到github中，就会自己执行actions <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1b2eea0193a4249a29f6fcdf1851047~tplv-k3u1fbpfcp-watermark.image?" alt="iShot_2023-03-23_10.17.31.png"> 执行状态可以自行查看</p></li><li><p>完成之后会在分支中，新增一个分支</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0da2de9038684ea989a20dcc7ca9d517~tplv-k3u1fbpfcp-watermark.image?" alt="iShot_2023-03-23_10.19.11.png"></p></li><li><p>在 settings/pages 中更换源为 gh-pages</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7758f5bae283496487657a12bdc5b624~tplv-k3u1fbpfcp-watermark.image?" alt="1679538071539.jpg"> 此时完成了，大家可以看看自己部署的博客了</p></li></ol><p><strong>我反正用了不止10分钟，毕竟还要研究，但你们看到这么清晰的文章，我觉得10分钟足够了，如果超过了，你们反思一下，我哪里写的不清楚，我改还不行么</strong></p><p><strong>我觉得你们一定会报错，如果没报错当我没说</strong></p><p><a href="https://juejin.cn/post/7213544005602590780" target="_blank" rel="noreferrer">GitHub Action: The process ‘/usr/bin/git‘ failed with exit code 128</a></p>`,17),o=[e];function t(c,i,r,C,A,y){return a(),n("div",null,o)}const d=s(p,[["render",t]]);export{D as __pageData,d as default};
