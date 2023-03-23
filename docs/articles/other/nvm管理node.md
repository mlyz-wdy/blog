---
title: Mac使用nvm管理node
date: 2023年02月24日
tags:
 - mac
categories:
 - 开发环境
---

# 初衷
vue项目想换 typeScript 来写，但是安装依赖报错，需要降级node，那我可不干，我喜欢用最高版本的东西，不想降级，你不支持还怪我咯？？？

但是没办法我向他妥协，我项目要用它，它牛逼！

所以想到多版本管理node，平时用高版本的，遇到这种低版本需求再切换回来

## 卸载 node
安装的时候容易，去官网下个包就安装了，卸载起来可真麻烦，不过总结一下，找找各位的卸载方法，融合起来

就用下面命令来卸载（依次执行）
```js
$ sudo npm uninstall npm -g
$ sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /var/db/receipts/org.nodejs.*
$ sudo rm -rf /usr/local/include/node /Users/$USER/.npm
$ sudo rm /usr/local/bin/node
```

## 安装 nvm
mac下的安装

命令是：
```js
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

$ nvm -version
```
安装完成之后，就可以尝试 node 各种姿势，哦不对，是各种版本了

**nvm常用指令**
```js
nvm --help                          显示所有信息
nvm --version                       显示当前安装的nvm版本
nvm install [-s] <version>          安装指定的版本，如果不存在.nvmrc,就从指定的资源下载安装
nvm install [-s] <version>  -latest-npm 安装指定的版本，平且下载最新的npm
nvm uninstall <version>             卸载指定的版本
nvm use [--silent] <version>        使用已经安装的版本  切换版本
nvm current                         查看当前使用的node版本
nvm ls                              查看已经安装的版本
nvm ls  <version>                   查看指定版本
nvm ls-remote                       显示远程所有可以安装的nodejs版本
nvm ls-remote --lts                 查看长期支持的版本
nvm install-latest-npm              安装罪行的npm
nvm reinstall-packages <version>    重新安装指定的版本
nvm cache dir                       显示nvm的cache
nvm cache clear                     清空nvm的cache
```

### 范例
按照我的习惯，给个范例出来

```js
// 1. 安装 8.0 版本
$ nvm install 8.0

// 2. 查看版本
$ nvm ls

// 3. 切换版本
$ nvm use v8.0.0
```

给个金星老师的手势！！！！！👏👏👏👏
