<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script>
import Gitalk from "gitalk"
import md5 from 'md5'
import "gitalk/dist/gitalk.css"
export default {
  name: "git-talk",
  data() {
    return {}
  },
  mounted() {
    const commentConfig = {
        id: md5(location.name), // 可选。默认为 location.href
        owner: 'mlyz-wdy', // GitHub repository 所有者
        repo: 'blog', // GitHub repository
        clientID: '8d75bd3d346537698e1e', // 自己的clientID
        clientSecret: 'ab6651df300fb17af64bb5bb18fbef4baf6d1a31', // 自己的clientSecret
        admin: ['mlyz-wdy'], // GitHub repository 所有者
        labels: [{ name: 'Gitalk' }], // GitHub issue 的标签
        createIssueManually: true,
        title: 'mlyz',
        distractionFreeMode: false,
    }
    const gitalk = new Gitalk(commentConfig)
    gitalk.render("gitalk-container")
  },
}
</script>
<style>
.gt-container .gt-header-textarea {
  color: #000;
}
</style>

