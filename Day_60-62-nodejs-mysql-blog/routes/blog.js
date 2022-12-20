const express = require('express');
const db = require('../data/database');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/posts');
});

router.get('/new-post', async (req, res) => {
  const [authors] = await db.query('SELECT * FROM authors');
  res.render('create-post', { authors });
});

router.get('/posts', async (req, res) => {
  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email FROM posts 
    INNER JOIN authors WHERE posts.author_id = authors.id
  `;

  try {
    const [posts] = await db.query(query);
    res.render('posts-list', { posts });
  } catch (e) {
    res.render('500');
  }
});

router.get('/posts/:post_id', async (req, res) => {
  const postId = req.params.post_id;
  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts 
    INNER JOIN authors 
    WHERE posts.author_id = authors.id AND posts.id = ?
    `;

  try {
    const [post] = await db.query(query, [postId]);

    if (!post || post.length === 0) {
      return res.status(404).render('404');
    }

    const postData = {
      ...post[0],
      date: post[0].date.toISOString(),
      formattedDate: post[0].date.toLocaleDateString(),
    }

    res.render('post-detail', { post: postData });
  } catch (e) {
    console.log(e);
    res.status(500).render('500');
  }
});

router.get('/posts/:post_id/edit', async (req, res) => {
  const postId = req.params.post_id;
  const query = `
    SELECT * FROM posts 
    WHERE id = ?
    `;

  try {
    const [post] = await db.query(query, [postId]);

    if (!post || post.length === 0) {
      return res.status(404).render('404');
    }

    res.render('update-post', { post: post[0] })
  } catch (e) {
    console.log(e);
    res.status(500).render('500');
  }
});

router.post('/posts/:post_id/edit', async (req, res) => {
  const postId = req.params.post_id;
  const reqBody = req.body;
  const query = `
    UPDATE posts SET title = ?, summary = ?, body = ?
    WHERE posts.id = ?
    `;
  const params = [reqBody.title, reqBody.summary, reqBody.content, postId];

  try {
    await db.query(query, params);

    res.redirect(`/posts`);
  } catch (e) {
    console.log(e);
    res.status(500).render('500');
  }
});

router.post('/posts/:post_id/delete', async (req, res) => {
  const postId = req.params.post_id;
  const query = `
    DELETE FROM posts WHERE id = ?
  `

  try {
    await db.query(query, [postId]);
    res.redirect(`/posts`);
  } catch (e) {
    console.log(e);
    res.status(500).render('500');
  }
}); 

router.post('/posts', async (req, res) => {
  const requestData = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author
  ];
  try {
    await db.query('INSERT INTO posts (title, summary, body, author_id) VALUES (?)', [requestData]);
    res.redirect('/posts');
  } catch (e) {
    console.log(e);
    res.render('500');
  }
})

module.exports = router;