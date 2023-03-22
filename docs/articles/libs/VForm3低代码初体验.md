---
title: VForm3低代码初体验
date:  2023年03月10日
tags:
 - 低代码
categories:
 - 三方库
---

# VForm3低代码初体验

## 使用背景
1. 集团需求，希望可以动态设计表单，收集所需信息，报表填写，定时上交
2. **那如果我手动写表单，哪还有摸鱼时间**

## 技术栈
vue3 + elementUI-plus

## 展示
![vform](https://cdn.nlark.com/yuque/0/2021/gif/12445330/1627369513020-c49a8239-8727-437c-8f8a-45ee354f91a4.gif)

## 安装使用
#### 方式一
`npm i vform3-builds`

#### 方式二
1. 拉取官方源码 [https://gitee.com/vdpadmin/variant-form3-vite](https://gitee.com/vdpadmin/variant-form3-vite)
2. 运行官方源码，打包 lib，会在 dist 文件中分别生成四个文件
    ```js
    designer.style.css
    designer.umd.js
    render.style.css
    render.umd.js
    ```
    引入到项目放在 `/lib/vform` 中

3. main.js 中引入上述四个文件，使用方式参考下方文档

**注意：VForm 3依赖Element Plus，需要先安装Element Plus**

## 使用 VFormDesigner 组件
它是表单设计器，就是拖拽设计的部分，设计完成，生成特定的 json 数据结构，页面才可以用另一个组件加载出来，体验一下就知道了

在 main.js 中引入
```js
import ElementPlus from 'element-plus'  //引入element-plus库
import VForm3 from 'vform3-builds'  //引入VForm3库

import 'element-plus/dist/index.css'  //引入element-plus样式
import 'vform3-builds/dist/designer.style.css'  //引入VForm3样式

const app = createApp(App)
app.use(ElementPlus)  //全局注册element-plus
app.use(VForm3)  //全局注册VForm3(同时注册了v-form-designe、v-form-render等组件)

/* 注意：如果你的项目中有使用axios，请用下面一行代码将全局axios复位为你的axios！！ */
window.axios = axios
app.mount('#app')

```
在 vue 模板中使用
```html
<template>
  <v-form-designer></v-form-designer>
</template>

<script setup>
</script>

<style lang="scss">
body {
  margin: 0;  /* 如果页面出现垂直滚动条，则加入此行CSS以消除之 */
}

</style>
```


## 使用 VFormRender 组件
它是表单渲染的，利用上面设计器组件生成的 json 数据结构，渲染出表单内容
> 重要提示：如果你在项目中已按照上一节文档注册了VFormDesigner组件，则不再需要注册VFormRender组件。仅当在项目中独立使用VFormRender组件（即项目中不含表单设计器）时才需要注册。

在 main.js 中引入
```js
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'  //如果需要axios，请引入

import ElementPlus from 'element-plus'  //引入element-plus库
import VFormRender from 'vform3-builds/dist/render.umd.js'  //引入VFormRender组件

import 'element-plus/dist/index.css'  //引入element-plus样式
import 'vform3-builds/dist/render.style.css'  //引入VFormRender样式

const app = createApp(App)
app.use(ElementPlus)  //全局注册element-plus
app.use(VFormRender)  //全局注册VFormRender等组件
/* 注意：如果你的项目中有使用axios，请用下面一行代码将全局axios复位为你的axios！！ */
window.axios = axios
app.mount('#app')

```
在 vue 模板中使用
```html
<template>
  <div>
    <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
    </v-form-render>
    <el-button type="primary" @click="submitForm">Submit</el-button>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'

  /* 注意：formJson是指表单设计器导出的json，此处演示的formJson只是一个空白表单json！！ */
  const formJson = reactive({"widgetList":[],"formConfig":{"modelName":"formData","refName":"vForm","rulesName":"rules","labelWidth":80,"labelPosition":"left","size":"","labelAlign":"label-left-align","cssCode":"","customClass":"","functions":"","layoutType":"PC","jsonVersion":3,"onFormCreated":"","onFormMounted":"","onFormDataChange":"","onFormValidate":""}})
  const formData = reactive({})
  const optionData = reactive({})
  const vFormRef = ref(null)

  // 显示弹框
function show(row) {
  showDialog.value = true
  reportName.value = row.reportName

  http('detail', { formDataId: row.formDataId }).then((res) => {
    // 根据 JSON 结构，渲染出页面表单
    vFormRef.value.setFormJson(res.formConfigDto)
    // 根据数据渲染出页面填入的值，填过
    nextTick(() => {
        vFormRef.value.setFormData(res.formDataDto)
        nextTick(() => {
            // 填过的数据展示给人的时候，禁用表单，不能更改
          vFormRef.value.disableForm()
        })
      })
  })
}
</script>
```

## 官方
[https://www.yuque.com/visualdev/vform3/using-render](https://www.yuque.com/visualdev/vform3/using-render)

如有不懂可以下方留言，或者查看官方文档

高级例子后面用到会继续补写文档