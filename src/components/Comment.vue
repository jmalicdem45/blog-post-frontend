<template>
    <div class="comment">
        <span class="name">
            {{ comment.name }}
        </span>
        <span class="comment-content">
            {{ comment.comment }} 
        </span>
        <span class="reply" @click="displayModal(comment)" v-if="comment.level < 3">Reply</span>
        <Comment v-if="comment.children" v-for="comment$ in comment.children" :comment="comment$" />
    </div>
</template>

<script>
import { useCommentStore } from '../stores/counter';

export default ({
    props: ['comment'],
    setup() {
        const commentStore = useCommentStore();

        function displayModal(comment) {
            commentStore.setSelectedComment(comment);
            commentStore.openModal();
        }

        return { commentStore, displayModal };
    },
})
</script>

<style scoped>
    .comment {
        width: 100%;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
        padding: 1rem;
        border-radius: 0.5em;
    }
    .name {
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
    }
    .reply {
        color: white;
        font-weight: bold;
        margin-left: 1rem;
        margin-top: 0.5rem;
    }
    .reply:hover {
        color: antiquewhite;
        cursor: pointer;
    }
    
</style>
