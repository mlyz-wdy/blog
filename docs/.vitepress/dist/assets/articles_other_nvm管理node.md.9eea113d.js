import{_ as s,c as n,o as a,N as l}from"./chunks/framework.cd9250a1.js";const v=JSON.parse('{"title":"Mac使用nvm管理node","description":"","frontmatter":{"title":"Mac使用nvm管理node","date":"2023年02月24日","tags":["mac"],"categories":["开发环境"]},"headers":[],"relativePath":"articles/other/nvm管理node.md"}'),e={name:"articles/other/nvm管理node.md"},p=l(`<h1 id="初衷" tabindex="-1">初衷 <a class="header-anchor" href="#初衷" aria-label="Permalink to &quot;初衷&quot;">​</a></h1><p>vue项目想换 typeScript 来写，但是安装依赖报错，需要降级node，那我可不干，我喜欢用最高版本的东西，不想降级，你不支持还怪我咯？？？</p><p>但是没办法我向他妥协，我项目要用它，它牛逼！</p><p>所以想到多版本管理node，平时用高版本的，遇到这种低版本需求再切换回来</p><h2 id="卸载-node" tabindex="-1">卸载 node <a class="header-anchor" href="#卸载-node" aria-label="Permalink to &quot;卸载 node&quot;">​</a></h2><p>安装的时候容易，去官网下个包就安装了，卸载起来可真麻烦，不过总结一下，找找各位的卸载方法，融合起来</p><p>就用下面命令来卸载（依次执行）</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$ sudo npm uninstall npm -g</span></span>
<span class="line"><span style="color:#A6ACCD;">$ sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /var/db/receipts/org.nodejs.*</span></span>
<span class="line"><span style="color:#A6ACCD;">$ sudo rm -rf /usr/local/include/node /Users/$USER/.npm</span></span>
<span class="line"><span style="color:#A6ACCD;">$ sudo rm /usr/local/bin/node</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="安装-nvm" tabindex="-1">安装 nvm <a class="header-anchor" href="#安装-nvm" aria-label="Permalink to &quot;安装 nvm&quot;">​</a></h2><p>mac下的安装</p><p>命令是：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">$ nvm -version</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>安装完成之后，就可以尝试 node 各种姿势，哦不对，是各种版本了</p><p><strong>nvm常用指令</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">nvm --help                          显示所有信息</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm --version                       显示当前安装的nvm版本</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm install [-s] &lt;version&gt;          安装指定的版本，如果不存在.nvmrc,就从指定的资源下载安装</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm install [-s] &lt;version&gt;  -latest-npm 安装指定的版本，平且下载最新的npm</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm uninstall &lt;version&gt;             卸载指定的版本</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm use [--silent] &lt;version&gt;        使用已经安装的版本  切换版本</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm current                         查看当前使用的node版本</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm ls                              查看已经安装的版本</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm ls  &lt;version&gt;                   查看指定版本</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm ls-remote                       显示远程所有可以安装的nodejs版本</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm ls-remote --lts                 查看长期支持的版本</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm install-latest-npm              安装罪行的npm</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm reinstall-packages &lt;version&gt;    重新安装指定的版本</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm cache dir                       显示nvm的cache</span></span>
<span class="line"><span style="color:#A6ACCD;">nvm cache clear                     清空nvm的cache</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="范例" tabindex="-1">范例 <a class="header-anchor" href="#范例" aria-label="Permalink to &quot;范例&quot;">​</a></h3><p>按照我的习惯，给个范例出来</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 1. 安装 8.0 版本</span></span>
<span class="line"><span style="color:#A6ACCD;">$ nvm install 8.0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 2. 查看版本</span></span>
<span class="line"><span style="color:#A6ACCD;">$ nvm ls</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 3. 切换版本</span></span>
<span class="line"><span style="color:#A6ACCD;">$ nvm use v8.0.0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>给个金星老师的手势！！！！！👏👏👏👏</p>`,19),o=[p];function t(c,r,i,C,d,A){return a(),n("div",null,o)}const h=s(e,[["render",t]]);export{v as __pageData,h as default};
