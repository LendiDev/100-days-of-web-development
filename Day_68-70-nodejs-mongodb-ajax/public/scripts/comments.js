const loadCommentsButtonElement = document.getElementById('load-comments-btn');
const commentsSectionElement = document.getElementById('comments');

const createCommentsList = (comments) => {
  const commentListElement = document.createElement('ul');

  for (const comment of comments) {
    const commentElement = document.createElement('li');
    commentElement.innerHTML = `
    <article class="comment-item">
      <h2>${comment.title}</h2>
      <p>${comment.text}</p>
    </article>
  `;

    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

const fetchCommentsForPost = async () => {
  const postId = loadCommentsButtonElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();

  const commentListElement = createCommentsList(responseData.comments);
  commentsSectionElement.innerHTML = '';
  commentsSectionElement.appendChild(commentListElement);
}

loadCommentsButtonElement.addEventListener('click', fetchCommentsForPost);