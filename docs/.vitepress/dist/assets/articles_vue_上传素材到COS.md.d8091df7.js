import{_ as s,c as n,o as a,N as l}from"./chunks/framework.cd9250a1.js";const d=JSON.parse('{"title":"上传素材到COS","description":"","frontmatter":{"title":"上传素材到COS","date":"2023年02月24日","tags":["代码段","vue"],"categories":["vue"]},"headers":[],"relativePath":"articles/vue/上传素材到COS.md"}'),e={name:"articles/vue/上传素材到COS.md"},p=l(`<ol><li>创建 cos 存储桶，得到两个字段：<code>bucket、region</code></li><li>安装 cos， <code>npm i cos-js-sdk-v5</code></li></ol><h1 id="上传素材到cos" tabindex="-1">上传素材到COS <a class="header-anchor" href="#上传素材到cos" aria-label="Permalink to &quot;上传素材到COS&quot;">​</a></h1><h2 id="_1-后端接口" tabindex="-1">1. 后端接口 <a class="header-anchor" href="#_1-后端接口" aria-label="Permalink to &quot;1. 后端接口&quot;">​</a></h2><p>后端需要写接口，返回必要的参数</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  expiredTime: 1650611112,</span></span>
<span class="line"><span style="color:#A6ACCD;">  expiration: &#39;2022-04-22T07:05:12Z&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  credentials: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    sessionToken:</span></span>
<span class="line"><span style="color:#A6ACCD;">      &#39;GpzQn7EqgkJQMSVCn61DEj5kQfjhxjma94b489725e9639de284d59674b7ea3e6KoJ2AMSp9y_TbIe5IE5zpYtO9cednHjZTL0-tz9ZyrB1PUJet1kv4GBmQ2kYM0jl_l-llK10EVMQy7e5Ft4g8b_DoZqkSD0EOPbN8FiIw-TfZmcaoAmNHBZ15_wjta66KHVRXxmL_F_RmkCYuFRweXpgrF8MQwlkjmqm9X03t9Or2poxxjaY-spk8lAr2HKrUaPUHlAKTpeEW2ldEQFgiVAdUypSA7F-5YcWU5thUybPWy_4O3k59s6cUcouWTjfFnW0uyvO8EspEInUt0nh92z5N7CZzqsi-4J-iDyeMsi-HtIYZx-jBoLClMghhcd_b89PIruwbXzwBWkPDsccjX6-z8tM9D2q8O0ueeiiU1NueWmpA4_I7zCgeZ0UroK4MbFK39mWnsvUOnlVDQk116gvJxXzUDr-kfB7YPNaQu2KGmqFJfgh1x29CqLcfDVq_Hz2_q_63ADrc4gyUV6v7rVT68MFc8X_ykCg0VR7jjFQ5m3K1rDgUeBBYGg0IoDsJ5LnfG3wSo2r-2aUE9Yz7WlqPcwenT_ZnLSEfFzo_sdPtOfuJNzoEWhDEnphIHJy&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    tmpSecretId:</span></span>
<span class="line"><span style="color:#A6ACCD;">      &#39;AKIDUy1Qr9tMd-OkFnTfLaVk65l5BGoFgHXUD70wckEP-podj0WjoytmVRMPrTQeArgj&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    tmpSecretKey: &#39;23w2w8Xt1zVsi2mrAjkILtJ3M4ebTKiYFqfFjB4/SUc=&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  requestId: &#39;5f388f71-fb1d-4ade-9c8d-2a4338d086b3&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  startTime: 1650609312</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="_2-前端请求将参数配置到-cos" tabindex="-1">2. 前端请求将参数配置到 cos <a class="header-anchor" href="#_2-前端请求将参数配置到-cos" aria-label="Permalink to &quot;2. 前端请求将参数配置到 cos&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const cosArg = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  bucket: &#39;bucket01-1305714290&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  region: &#39;ap-shanghai&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/* eslint-disable */</span></span>
<span class="line"><span style="color:#A6ACCD;">export function uploadCos(_obj) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    axios.get(urls.getTempKeys).then(res =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      let cos = new COS({</span></span>
<span class="line"><span style="color:#A6ACCD;">        getAuthorization: function (options, callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          callback({</span></span>
<span class="line"><span style="color:#A6ACCD;">            TmpSecretId: res.data.credentials &amp;&amp; res.data.credentials.tmpSecretId,</span></span>
<span class="line"><span style="color:#A6ACCD;">            TmpSecretKey:</span></span>
<span class="line"><span style="color:#A6ACCD;">              res.data.credentials &amp;&amp; res.data.credentials.tmpSecretKey,</span></span>
<span class="line"><span style="color:#A6ACCD;">            XCosSecurityToken:</span></span>
<span class="line"><span style="color:#A6ACCD;">              res.data.credentials &amp;&amp; res.data.credentials.sessionToken,</span></span>
<span class="line"><span style="color:#A6ACCD;">            ExpiredTime: res.data.expiredTime</span></span>
<span class="line"><span style="color:#A6ACCD;">          })</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">      })</span></span>
<span class="line"><span style="color:#A6ACCD;">      cos.putObject(</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">          Bucket: cosArg.bucket,</span></span>
<span class="line"><span style="color:#A6ACCD;">          Region: cosArg.region,</span></span>
<span class="line"><span style="color:#A6ACCD;">          Body: _obj,</span></span>
<span class="line"><span style="color:#A6ACCD;">          SliceSize: 1024 * 1024 * 5,</span></span>
<span class="line"><span style="color:#A6ACCD;">          Key: \`/uploads/materials/\${new Date().getTime()}\${_obj.name}\`,</span></span>
<span class="line"><span style="color:#A6ACCD;">          onProgress: function (progressData) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            var percent = parseInt(progressData.percent * 10000) / 100</span></span>
<span class="line"><span style="color:#A6ACCD;">            var speed = parseInt((progressData.speed / 10242 / 1024) * 100) / 100</span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&#39;进度: &#39; + percent + &#39;%; 速度: &#39; + speed + &#39;Mb/s&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&#39;进度: &#39; + parseInt(percent) + &#39;%&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&#39;上传中&#39;, JSON.stringify(progressData))</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        function (err, data) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          if (err) return</span></span>
<span class="line"><span style="color:#A6ACCD;">          console.log(\`https://\${data.Location}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">          resolve({ url: \`https://\${data.Location}\` })</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">      )</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="_3-页面中引入" tabindex="-1">3. 页面中引入 <a class="header-anchor" href="#_3-页面中引入" aria-label="Permalink to &quot;3. 页面中引入&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;el-upload :http-request=&quot;uploadImg&quot; action=&quot;&quot; multiple accept=&quot;.jpg, .png, .jpeg, .gif, .svg&quot; :show-file-list=&quot;false&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;fc fca upload&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">          &lt;i class=&quot;el-icon-circle-plus&quot;&gt;&lt;/i&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">          &lt;div class=&quot;mt8&quot;&gt;上传&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/el-upload&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">import {uploadCos} from &#39;@/request&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: &#39;MaterialManageView&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    methods: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        uploadImg(e) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            uploadCos(e.file).then(res =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">                if (res.isError) return</span></span>
<span class="line"><span style="color:#A6ACCD;">                this.imgs.push(res.url)</span></span>
<span class="line"><span style="color:#A6ACCD;">            })</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,9),o=[p];function t(c,r,i,C,A,y){return a(),n("div",null,o)}const u=s(e,[["render",t]]);export{d as __pageData,u as default};
