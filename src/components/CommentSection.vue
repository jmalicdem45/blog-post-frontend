<template>
    <div class="comment-section">
        <header>
            Comments
        </header>
         <span class="add-comment" @click="openCreateComment">Add Comment+</span>
        <Comment v-for="comment in commentStore.comments" :comment="comment" />
    </div>
</template>

<script>
  import axios from 'axios';
  import API_URL from '../url.ts';
  import Comment from './Comment.vue'
  import { useCommentStore } from '../stores/counter';

  export default {
    name: 'CommentSection',
    setup() {
        const commentStore = useCommentStore();

        function openCreateComment() {
            commentStore.setSelectedComment(null);
            commentStore.openModal();
        }

        function initComments() {
            axios.get('comments', {
                baseURL: API_URL,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(data$ => {
                const { data }  = data$;
                commentStore.setComments(data);
            });
        }

        return { commentStore, openCreateComment, initComments, };
    },
    components: {
      Comment,
    },
    created() {
        this.initComments();
    },
  };
</script>

<style scoped>
    .comment-section {
        width: 100%;
        margin-top: 2rem;
    }
    header {
        font-size: 1.4rem;
        font-weight: bolder;
        color: white;
        margin: auto;
        width: 8rem;
        margin-bottom: 1rem;
    }
    .add-comment {
        font-weight: bold;
        font-size: 1rem;
    }    
    .add-comment:hover {
        color: white;
        cursor: pointer;
    }
</style>