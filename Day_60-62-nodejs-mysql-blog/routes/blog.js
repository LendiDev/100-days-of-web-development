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
    res.render('posts-list', { posts } );
  } catch (e) {
    res.render('500');
  }
});

router.get('/posts/:post_id', async (req, res) => {
  const postId = req.params.post_id;
  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email FROM posts 
    INNER JOIN authors 
    WHERE posts.author_id = authors.id AND posts.id = ${postId}
  `;

  try {
    const [post] = await db.query(query);
    res.render('post-detail', { post: post[0] } );
  } catch (e) {
    res.render('500');
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