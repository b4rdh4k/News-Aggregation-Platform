import { ref } from 'vue';

export async function fetchComments(articleId) {
  try {
    const response = await fetch(`https://89xx7tdx-5095.euw.devtunnels.ms/comment/article/${articleId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.value || [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export async function postComment(commentData) {
  try {
    const response = await fetch('https://89xx7tdx-5095.euw.devtunnels.ms/comment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting comment:', error);
    return null;
  }
}
