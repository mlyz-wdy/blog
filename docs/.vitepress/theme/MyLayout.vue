<!--.vitepress/theme/MyLayout.vue-->
<template>
  <Layout>
    <template #doc-after>
      <Comment />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import Comment from '../components/Comment.vue';
const { Layout } = DefaultTheme;

</script>
<style>
.gt-container .gt-header-textarea {
  color: #000;
}
</style>
