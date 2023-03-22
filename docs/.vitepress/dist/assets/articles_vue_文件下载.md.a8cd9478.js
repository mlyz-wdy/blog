import{_ as s,c as n,o as a,N as l}from"./chunks/framework.cd9250a1.js";const d=JSON.parse('{"title":"文件下载","description":"","frontmatter":{"title":"文件下载","date":"2023年02月24日","tags":["代码段","vue"],"categories":["vue"]},"headers":[],"relativePath":"articles/vue/文件下载.md"}'),e={name:"articles/vue/文件下载.md"},p=l(`<h1 id="文件下载" tabindex="-1">文件下载 <a class="header-anchor" href="#文件下载" aria-label="Permalink to &quot;文件下载&quot;">​</a></h1><p>开发中难免很多下载需求，各个项目经常使用，以下是开发 Vue 里面，自己使用的下载文件方式，如有更好的推荐，请各位不吝赐教</p><h2 id="_1-单个图片下载" tabindex="-1">1. 单个图片下载 <a class="header-anchor" href="#_1-单个图片下载" aria-label="Permalink to &quot;1. 单个图片下载&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function downloadImg(url, name) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  let image = new Image()</span></span>
<span class="line"><span style="color:#A6ACCD;">  image.setAttribute(&#39;crossOrigin&#39;, &#39;anonymous&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">  image.src = url</span></span>
<span class="line"><span style="color:#A6ACCD;">  image.onload = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    let canvas = document.createElement(&#39;canvas&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    canvas.width = image.width</span></span>
<span class="line"><span style="color:#A6ACCD;">    canvas.height = image.height</span></span>
<span class="line"><span style="color:#A6ACCD;">    let ctx = canvas.getContext(&#39;2d&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    ctx.drawImage(image, 0, 0, image.width, image.height)</span></span>
<span class="line"><span style="color:#A6ACCD;">    canvas.toBlob(blob =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      let url = URL.createObjectURL(blob)</span></span>
<span class="line"><span style="color:#A6ACCD;">      download(url, name)</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 用完释放URL对象</span></span>
<span class="line"><span style="color:#A6ACCD;">      URL.revokeObjectURL(url)</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function download(href, name) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  let eleLink = document.createElement(&#39;a&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">  eleLink.download = name</span></span>
<span class="line"><span style="color:#A6ACCD;">  eleLink.href = href</span></span>
<span class="line"><span style="color:#A6ACCD;">  eleLink.click()</span></span>
<span class="line"><span style="color:#A6ACCD;">  eleLink.remove()</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="下载文件" tabindex="-1">下载文件 <a class="header-anchor" href="#下载文件" aria-label="Permalink to &quot;下载文件&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">export function exportExcel(</span></span>
<span class="line"><span style="color:#A6ACCD;">  params,</span></span>
<span class="line"><span style="color:#A6ACCD;">  type = &#39;get&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  url = &#39;/api/crm/export/exportGrowthRecord&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 导出表格</span></span>
<span class="line"><span style="color:#A6ACCD;">  const temConfig = {</span></span>
<span class="line"><span style="color:#A6ACCD;">    headers: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      &#39;Content-Type&#39;: &#39;application/json; application/octet-stream&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      token</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    params,</span></span>
<span class="line"><span style="color:#A6ACCD;">    responseType: &#39;blob&#39; // 要点需要返回类型</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    axios[type](&#39;/api&#39; + url, temConfig).then(res =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (res.status === 200) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        let blob = new Blob([res.data], {</span></span>
<span class="line"><span style="color:#A6ACCD;">          // 这里一定要和后端对应，不然可能出现乱码或者打不开文件</span></span>
<span class="line"><span style="color:#A6ACCD;">          type: &#39;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;">        const fname = res.headers[&#39;content-disposition&#39;].split(&#39;=&#39;)[1] // 下载文件的名字</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        if (window.navigator.msSaveOrOpenBlob) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          navigator.msSaveBlob(blob, fname)</span></span>
<span class="line"><span style="color:#A6ACCD;">        } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">          const link = document.createElement(&#39;a&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">          link.href = window.URL.createObjectURL(blob)</span></span>
<span class="line"><span style="color:#A6ACCD;">          link.download = fname // 在前端也可以设置文件名字</span></span>
<span class="line"><span style="color:#A6ACCD;">          link.click()</span></span>
<span class="line"><span style="color:#A6ACCD;">          window.URL.revokeObjectURL(link.href)</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">        Message({</span></span>
<span class="line"><span style="color:#A6ACCD;">          type: &#39;error&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">          message: &#39;导出失败&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,6),o=[p];function c(t,i,r,C,A,y){return a(),n("div",null,o)}const m=s(e,[["render",c]]);export{d as __pageData,m as default};
