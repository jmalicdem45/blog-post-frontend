import { defineStore } from 'pinia'

interface State {
  comments: any[];
  selectedComment: any;
  isModalOpen: boolean;
}
export const useCommentStore = defineStore('commentstore', {
  state: (): State => ({
    comments: [],
    selectedComment: null,
    isModalOpen: false,
  }),
  actions: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    getComments() {
      return this.comments;
    },
    setComments(comments: any[]) {
      this.$patch({
        comments: comments,
      });
     this.comments = comments;
    },
    setSelectedComment(comment: any) {
      this.selectedComment = comment;
    },
  },
});
