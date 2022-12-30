const Post = require('../models/post.model');

const getHome = (req, res) => {
  return res.render('welcome', { csrfToken: req.csrfToken() });
}

const getAdmin = async (req, res) => {
  if (!res.locals.isAuth) return res.status(401).render('401');

  const posts = await Post.fetchAll();

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: '',
      content: '',
    };
  }

  req.session.inputData = null;

  res.render('admin', {
    posts: posts,
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
}

const getSinglePost = async (req, res) => {
  const post = new Post(null, null, req.params.id);
  await post.fetch();

  if (!post.title || !post.content) {
    return res.render('404'); // 404.ejs is missing at this point - it will be added later!
  }

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: post.title,
      content: post.content,
    };
  }

  req.session.inputData = null;

  res.render('single-post', {
    post: post,
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
}

const createPost = async (req, res) => {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === '' ||
    enteredContent.trim() === ''
  ) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      title: enteredTitle,
      content: enteredContent,
    };

    res.redirect('/admin');
    return; // or return res.redirect('/admin'); => Has the same effect
  }

  const newPost = new Post(enteredTitle, enteredContent);
  await newPost.save();

  res.redirect('/admin');
}

const editPost = async (req, res) => {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === '' ||
    enteredContent.trim() === ''
  ) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      title: enteredTitle,
      content: enteredContent,
    };

    console.log(req.params.id);
    console.log(req.params);
    console.log(req.query);


    res.redirect(`/posts/${req.params.id}/edit`);
    return;
  }

  const newPost = new Post(enteredTitle, enteredContent, req.params.id);
  await newPost.save();

  res.redirect('/admin');
}

const deletePost = async (req, res) => {
  const post = new Post(null, null, req.params.id);
  await post.delete();

  res.redirect('/admin');
}

module.exports = {
  getHome,
  getAdmin,
  getSinglePost,
  createPost,
  editPost,
  deletePost,
}