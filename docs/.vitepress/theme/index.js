// .vitepress/theme/index.js

import Theme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'

export default {
  ...Theme,
  Layout: MyLayout
}