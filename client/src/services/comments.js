export async function fetchComments(articleId) {
  try {
    const response = await fetch(`https://89xx7tdx-5095.euw.devtunnels.ms/comment/article/${articleId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.value || data.Value || [];
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
    }else{
      console.log('response ok')
    }

  } catch (error) {
    console.error('Error submitting comment:', error);
    return null;
  }
}
