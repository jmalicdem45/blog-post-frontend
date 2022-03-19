
<template>
  <BlogPost />
  <CommentSection />
  <CreateCommentModal v-if="commentStore.isModalOpen" :comment="commentStore.selectedComment" />
</template>

<script setup>
import BlogPost from './components/BlogPost.vue';
import CommentSection from './components/CommentSection.vue';
import CreateCommentModal from './components/CreateCommentModal.vue';
import { useCommentStore } from './stores/counter';

const commentStore = useCommentStore();
</script>

<style>
@import './assets/base.css';

#app {
  max-width: 100%;
  margin: 0;
  padding: 2rem;

  font-weight: normal;
}
</style>
