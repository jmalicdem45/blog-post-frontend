<template>
    <div class="comment-section">
        <header>
            Comments
        </header>
        <span class="add-comment" @click="handleAddCommentClick">Add Comment+</span>
        <div class="comment">
            <span class="name">
                Jeremiah Malicdem
            </span>
            <span class="comment-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id velit, deserunt autem libero consequuntur tempore eveniet maxime quia exercitationem sint laboriosam sunt harum aliquid beatae quae quisquam vel corporis cum!  
            </span>
            <span class="reply" @click="handleReplyClick(null)">Reply</span>
        </div>

        <CreateCommentModal v-show="isModalVisible" @close="closeModal" />
    </div>
</template>

<script>
  import CreateCommentModal from './CreateCommentModal.vue';

  export default {
    name: 'CommentSection',
    components: {
      CreateCommentModal,
    },
    data() {
      return {
        isModalVisible: false,
        selectedComment: null,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      setSelectedComment(selectedComment) {
          this.selectedComment = selectedComment;
      },
      handleReplyClick(selectedComment) {
          this.setSelectedComment(selectedComment);
          this.showModal();
      },
      handleAddCommentClick() {
          this.setSelectedComment(null);
          this.showModal();
      },
    }
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
    .add-comment {
        font-weight: bold;
        font-size: 1rem;
    }
    .add-comment:hover {
        color: white;
        cursor: pointer;
    }
</style>