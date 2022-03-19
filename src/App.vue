<script setup lang="ts">
import BlogPost from './components/BlogPost.vue';
import CommentSection from './components/CommentSection.vue';
</script>

<template>
  <BlogPost />
  <CommentSection />
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 100%;
  margin: 0;
  padding: 2rem;

  font-weight: normal;
}
</style>
