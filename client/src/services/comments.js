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
      body: JSON.stringify({
        userId: commentData.userId,
        articleId: commentData.articleId,
        content: commentData.content,
        createdAt: commentData.createdAt,
        updatedAt: commentData.updatedAt,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Log the response status and headers for debugging
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers]);

    const text = await response.text();
    
    // Check if response is empty
    // if (!text) {
    //   console.warn('Empty response received');
    //   return {
    //     ...commentData,
    //     id: Date.now().toString(), // Generate a temporary ID for the new comment
    //   }; // Return the comment data as the new comment
    // }

    try {
      const data = JSON.parse(text);
      return data;
    } catch (parseError) {
      console.error('Error parsing response JSON:', parseError);
      return null;
    }
  } catch (error) {
    console.error('Error submitting comment:', error);
    return null;
  }
}
