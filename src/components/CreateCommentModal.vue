<template>
    <transition name="modal-fade">
        <div class="container">
        <div class="modal-backdrop">
            <div class="modal">
            <header class="modal-header">
                <slot name="header">
                Add comment {{ comment ? `to ${ comment.comment }` : null }}
                </slot>
                <button
                type="button"
                class="btn-close"
                @click="close"
                >
                x
                </button>
            </header>

            <section class="modal-body">
                <slot name="body">
                    <div class="name">
                        <span class="name-label">Name</span>
                        <input class="name-textfield" type="text" v-model="name">
                    </div>
                    <div class="comment">
                        <span class="comment-label">Comment</span>
                        <textarea class="comment-content" v-model="commentText"></textarea>
                    </div>
                </slot>
            </section>

            <footer class="modal-footer">
                <button
                type="button"
                class="btn-green"
                @click="save"
                >
                Save
                </button>
                </footer>
                </div>
            </div>
        </div>
    </transition>   
</template>

<script>
import axios from 'axios';
import API_URL from '../url.ts';
import { useCommentStore } from '../stores/counter';

  export default {
    name: 'CreateCommentModal',
    data() {
        return {
            name: '',
            commentText: ''
        };
    },
    setup() {
        const commentStore = useCommentStore();
        const comment = commentStore.selectedComment;

        function close() {
            commentStore.closeModal();
        }

        function reloadComments() {
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

        function done() {
            this.reloadComments();
            this.close();
        }

        return { useCommentStore, close, comment, done, reloadComments };
    },
    methods: {
        save() {
            const object = {
              name: this.name,
              comment: this.commentText,
              parent_id: this.comment ? this.comment.id : null,
            };
            axios.post(`${API_URL}comments`, object, {
                'Content-Type': 'application/json'
            }).then(() => {
                this.done();
            }).catch(err => {
                alert(err);
            });
        }
    }
  };
</script>

<style scoped>
    .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 40%;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: black;
    font-size: 2rem;
    justify-content: space-between;
    align-items: flex-end;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    width: 100%;
    align-items: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: black;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: gray;
    border: 1px solid gray;
    border-radius: 2px;
    width: 15%;
    margin-bottom: 0.3rem;
    height: 2rem;
    float: right;
  }

  .btn-green:hover {
    color: gray;
    background: white;
    border: 1px solid gray;
    border-radius: 2px;
    width: 15%;
    margin-bottom: 0.3rem;
    height: 2rem;
    cursor: pointer;
  }

  .name {
      color: black;
      display: flex;
      font-size: 1rem;
  }

  .name-label {
      font-weight: bold;
      margin-right: 1rem;
  }

  .name-textfield {
      width: 80%;
  }
  .comment {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
  }
  .comment-label {
      font-weight: bold;
      margin-right: 1rem;
      color: black;
  }

  .comment-content {
      margin-top: 0.5rem;
  }
  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>