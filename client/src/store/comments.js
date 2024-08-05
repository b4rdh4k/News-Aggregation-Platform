import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchComments, postComment } from '@/services/comments';

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref([]);
  const loading = ref(false);

  const loadComments = async (articleId) => {
    loading.value = true;
    comments.value = await fetchComments(articleId);
    loading.value = false;
    return comments.value;
  };

  const addComment = async (commentData) => {
    const newComment = await postComment(commentData);
    if (newComment) {
      comments.value.push(newComment);
    }
  };

  return {
    comments,
    loading,
    loadComments,
    addComment,
  };
});
