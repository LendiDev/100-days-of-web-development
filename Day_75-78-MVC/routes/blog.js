const express = require('express');

const BlogControllers = require('../controllers/post.controllers');
const guardRoute = require("../middlewares/auth-protection.middleware");

const router = express.Router();

router.get('/', BlogControllers.getHome);

router.get('/admin', guardRoute, BlogControllers.getAdmin);
router.get('/posts/:id/edit', guardRoute, BlogControllers.getSinglePost);

router.post('/posts', guardRoute, BlogControllers.createPost);
router.post('/posts/:id/edit', guardRoute, BlogControllers.editPost); 
router.post('/posts/:id/delete', guardRoute, BlogControllers.deletePost);

module.exports = router;
