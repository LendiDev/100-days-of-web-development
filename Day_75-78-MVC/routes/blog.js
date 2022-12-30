const express = require('express');

const BlogControllers = require('../controllers/post.controllers');

const router = express.Router();

router.get('/', BlogControllers.getHome);
router.get('/admin', BlogControllers.getAdmin);
router.get('/posts/:id/edit', BlogControllers.getSinglePost);

router.post('/posts', BlogControllers.createPost);
router.post('/posts/:id/edit', BlogControllers.editPost); 
router.post('/posts/:id/delete', BlogControllers.deletePost);

module.exports = router;
