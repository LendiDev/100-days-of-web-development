const express = require('express');
const bcryptjs = require('bcryptjs');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  res.render('signup');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  // TODO: handle errors;
  // TODO: handle confirmation of email is equal to actual email entered
  const enteredEmail = req.body.email;
  const enteredConfirmationEmail = req.body['confirm-email'];
  const enteredPassword = req.body.password;

  try {
    const userExists = await db.getDb().collection('users').findOne({ email: enteredEmail });

    if (userExists) {
      console.log('user already exists');
      return res.redirect('/login');
    }
  } catch (e) {
    console.log(e);
    return res.redirect('/register');
  }

  const encryptedPassword = await bcryptjs.hashSync(enteredPassword, 12);

  const newUser = {
    email: enteredEmail,
    password: encryptedPassword,
  }

  try {
    // successfully logged in
    const response = await db.getDb().collection('users').insertOne(newUser);

    if (response) {
      return res.redirect('/login');
    }
    // something went wrong... the user details wasn't saved in database;
    return res.redirect('/register');

  } catch (e) {
    console.log(e);
    return res.redirect('/register');
  }
});

router.post('/login', async function (req, res) {
  // TODO: handle errors;
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;

  const user = await db.getDb().collection('users').findOne({ email: enteredEmail });

  if (!user) {
    console.log("User doesn't exist");
    return res.redirect('/login');
  }

  const isPasswordMatching = await bcryptjs.compare(enteredPassword, user.password);

  if (!isPasswordMatching) {
    console.log("Password not matching the one in database");
    return res.redirect('/login');
  }

  // successful login
  res.redirect('/admin');
});

router.get('/admin', function (req, res) {
  res.render('admin');
});

router.post('/logout', function (req, res) { });

module.exports = router;
