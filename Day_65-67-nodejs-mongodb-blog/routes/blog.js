const express = require('express');

const mongodb = require('mongodb');
const db = require('../data/db');

const objectId = mongodb.ObjectId;
const router = express.Router();

router.get('/', function (req, res) {
  res.redirect('/posts');
});

router.get('/posts', async function (req, res) {
  const posts = await db.getDb().collection('posts').find().toArray();

  res.render('posts-list', { posts });
});

router.get('/posts/:id', async function (req, res, next) {
  const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  let postId = req.params.id;

  try {
    postId = new objectId(postId);
  } catch (e) {
    return res.status(404).render('404');
  }

  const postResponse = await db.getDb().collection('posts').findOne({ _id: postId });
  const post = {
    ...postResponse,
    formattedDate: new Date(postResponse.date).toLocaleDateString('UTC', dateOptions),
  }

  res.render('post-detail', { post });
});

router.get('/posts/:id/edit', async function (req, res) {
  const postId = new objectId(req.params.id);
  const post = await db.getDb().collection('posts').findOne({ _id: postId });

  res.render('update-post', { post });
});

router.post('/posts/:id/edit', async function (req, res) {
  const postId = new objectId(req.params.id);

  const updatedPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
  }

  const response = await db.getDb().collection('posts').updateOne({ _id: postId }, { $set: updatedPost });
  console.log(response);
  res.redirect('/posts');
});

router.post('/posts/:id/delete', async function (req, res) {
  const postId = new objectId(req.params.id);

  const response = await db.getDb().collection('posts').deleteOne({ _id: postId });
  console.log(response);
  res.redirect('/posts');
});

router.get('/new-post', async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();

  res.render('create-post', { authors });
});

router.post('/posts', async function (req, res) {
  const authorId = new objectId(req.body.author);
  const author = await db.getDb().collection('authors').findOne({ _id: authorId })

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      fullName: author.fullName,
      email: author.email,
    }
  }

  const response = await db.getDb().collection('posts').insertOne(newPost);
  console.log(response);
  res.redirect('/posts');
});

module.exports = router;