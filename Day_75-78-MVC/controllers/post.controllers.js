const Post = require("../models/post.model");
const validationSession = require("../util/validation-session");
const validation = require("../util/validation");

const getHome = (req, res) => {
  return res.render("welcome");
};

const getAdmin = async (req, res) => {

  const posts = await Post.fetchAll();

  const sessionErrorData = validationSession.getSessionErrorData(req, {
    title: '',
    content: '',
  });

  res.render("admin", {
    posts: posts,
    inputData: sessionErrorData,
    
  });
};

const getSinglePost = async (req, res, next) => {
  let post;
  try {
    post = new Post(null, null, req.params.id);
  } catch(e) {
    return res.status(404).render("404");
  }

  await post.fetch();

  if (!post.title || !post.content) return res.status(404).render("404");
  
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    title: post.title,
    content: post.content,
  });

  res.render("single-post", {
    post: post,
    inputData: sessionErrorData,
  });
};

const createPost = async (req, res) => {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashSessionErrors(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      () => {
        res.redirect("/admin");
      }
    );
    return;
  }

  const newPost = new Post(enteredTitle, enteredContent);
  await newPost.save();

  res.redirect("/admin");
};

const editPost = async (req, res) => {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashSessionErrors(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      () => {
        res.redirect(`/posts/${req.params.id}/edit`);
      }
    );
    return;
  }

  const newPost = new Post(enteredTitle, enteredContent, req.params.id);
  await newPost.save();

  res.redirect("/admin");
};

const deletePost = async (req, res) => {
  const post = new Post(null, null, req.params.id);
  await post.delete();

  res.redirect("/admin");
};

module.exports = {
  getHome,
  getAdmin,
  getSinglePost,
  createPost,
  editPost,
  deletePost,
};
