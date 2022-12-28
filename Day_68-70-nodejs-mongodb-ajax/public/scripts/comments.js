const loadCommentsButtonElement = document.getElementById('load-comments-btn');
const commentsSectionElement = document.getElementById('comments');
const commentsFormElement = document.querySelector('#comments-form form');

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

  try {
    const response = await fetch(`/posts/${postId}/comments`);

    if (!response.ok) {
      alert('Fetching comments filed.');
      return;
    }

    const { comments } = await response.json();

    if (comments && comments.length > 0) {
      const commentListElement = createCommentsList(comments);
      commentsSectionElement.innerHTML = '';
      commentsSectionElement.appendChild(commentListElement);
    } else {
      commentsSectionElement.firstElementChild.textContent = 'There is no any comments yet. Maybe add one?'
    }
  } catch (error) {
    alert('Something went wrong. Check your connection and try again later.');
  }

}

const submitCommentForPost = async (event) => {
  event.preventDefault();

  const commentFormData = new FormData(commentsFormElement);
  const enteredTitle = commentFormData.get('title');
  const enteredText = commentFormData.get('text');

  const comment = {
    title: enteredTitle,
    text: enteredText,
  };

  const postId = commentsFormElement.dataset.postid;

  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      fetchCommentsForPost();
    } else {
      alert('Something went wrong. Unable to add comment! We are working on a fix.');
    }
  } catch (error) {
    alert('Could not send request - maybe try a bit later.');
  }

}

loadCommentsButtonElement.addEventListener('click', fetchCommentsForPost);
commentsFormElement.addEventListener('submit', submitCommentForPost);