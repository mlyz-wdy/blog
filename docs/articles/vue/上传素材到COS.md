---
title: 上传素材到COS
date: 2023年02月24日
tags:
 - 代码段
 - vue
categories:
 - vue
---

1.  创建 cos 存储桶，得到两个字段：`bucket、region`
1.  安装 cos， `npm i cos-js-sdk-v5`

# 上传素材到COS

## 1. 后端接口

后端需要写接口，返回必要的参数

```js
{
  expiredTime: 1650611112,
  expiration: '2022-04-22T07:05:12Z',
  credentials: {
    sessionToken:
      'GpzQn7EqgkJQMSVCn61DEj5kQfjhxjma94b489725e9639de284d59674b7ea3e6KoJ2AMSp9y_TbIe5IE5zpYtO9cednHjZTL0-tz9ZyrB1PUJet1kv4GBmQ2kYM0jl_l-llK10EVMQy7e5Ft4g8b_DoZqkSD0EOPbN8FiIw-TfZmcaoAmNHBZ15_wjta66KHVRXxmL_F_RmkCYuFRweXpgrF8MQwlkjmqm9X03t9Or2poxxjaY-spk8lAr2HKrUaPUHlAKTpeEW2ldEQFgiVAdUypSA7F-5YcWU5thUybPWy_4O3k59s6cUcouWTjfFnW0uyvO8EspEInUt0nh92z5N7CZzqsi-4J-iDyeMsi-HtIYZx-jBoLClMghhcd_b89PIruwbXzwBWkPDsccjX6-z8tM9D2q8O0ueeiiU1NueWmpA4_I7zCgeZ0UroK4MbFK39mWnsvUOnlVDQk116gvJxXzUDr-kfB7YPNaQu2KGmqFJfgh1x29CqLcfDVq_Hz2_q_63ADrc4gyUV6v7rVT68MFc8X_ykCg0VR7jjFQ5m3K1rDgUeBBYGg0IoDsJ5LnfG3wSo2r-2aUE9Yz7WlqPcwenT_ZnLSEfFzo_sdPtOfuJNzoEWhDEnphIHJy',
    tmpSecretId:
      'AKIDUy1Qr9tMd-OkFnTfLaVk65l5BGoFgHXUD70wckEP-podj0WjoytmVRMPrTQeArgj',
    tmpSecretKey: '23w2w8Xt1zVsi2mrAjkILtJ3M4ebTKiYFqfFjB4/SUc='
  },
  requestId: '5f388f71-fb1d-4ade-9c8d-2a4338d086b3',
  startTime: 1650609312
}
```

## 2. 前端请求将参数配置到 cos

```js
const cosArg = {
  bucket: 'bucket01-1305714290',
  region: 'ap-shanghai'
}

/* eslint-disable */
export function uploadCos(_obj) {
  return new Promise((resolve, reject) => {
    axios.get(urls.getTempKeys).then(res => {
      let cos = new COS({
        getAuthorization: function (options, callback) {
          callback({
            TmpSecretId: res.data.credentials && res.data.credentials.tmpSecretId,
            TmpSecretKey:
              res.data.credentials && res.data.credentials.tmpSecretKey,
            XCosSecurityToken:
              res.data.credentials && res.data.credentials.sessionToken,
            ExpiredTime: res.data.expiredTime
          })
        }
      })
      cos.putObject(
        {
          Bucket: cosArg.bucket,
          Region: cosArg.region,
          Body: _obj,
          SliceSize: 1024 * 1024 * 5,
          Key: `/uploads/materials/${new Date().getTime()}${_obj.name}`,
          onProgress: function (progressData) {
            var percent = parseInt(progressData.percent * 10000) / 100
            var speed = parseInt((progressData.speed / 10242 / 1024) * 100) / 100
            console.log('进度: ' + percent + '%; 速度: ' + speed + 'Mb/s')
            console.log('进度: ' + parseInt(percent) + '%')
            console.log('上传中', JSON.stringify(progressData))
          }
        },
        function (err, data) {
          if (err) return
          console.log(`https://${data.Location}`)
          resolve({ url: `https://${data.Location}` })
        }
      )
    })
  })
}
```

## 3. 页面中引入

```js
<template>
   <el-upload :http-request="uploadImg" action="" multiple accept=".jpg, .png, .jpeg, .gif, .svg" :show-file-list="false">
      <div class="fc fca upload">
          <i class="el-icon-circle-plus"></i>
          <div class="mt8">上传</div>
      </div>
  </el-upload>
</template>

import {uploadCos} from '@/request'
export default {
    name: 'MaterialManageView',
    methods: {
        uploadImg(e) {
            uploadCos(e.file).then(res => {
                if (res.isError) return
                this.imgs.push(res.url)
            })
        }
    }
}
```