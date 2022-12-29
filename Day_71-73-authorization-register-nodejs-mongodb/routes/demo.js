const express = require('express');
const bcryptjs = require('bcryptjs');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      isError: false,
      errorMessage: '',
      email: '',
      confirmEmail: '',
      password: '',
    }
  }

  req.session.inputData = null;

  return res.render('signup', { inputData: sessionInputData });
});

router.get('/login', function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      isError: false,
      errorMessage: '',
      email: '',
      confirmEmail: '',
      password: '',
    };
  }

  req.session.inputData = null;

  res.render('login', { inputData: sessionInputData });
});

router.post('/signup', async function (req, res) {
  const enteredEmail = req.body.email;
  const enteredConfirmationEmail = req.body['confirm-email'];
  const enteredPassword = req.body.password;

  if (
    !enteredEmail ||
    !enteredConfirmationEmail ||
    !enteredPassword ||
    enteredPassword.trim().length < 6 ||
    enteredEmail !== enteredConfirmationEmail ||
    !enteredEmail.includes('@')
  ) {
    console.log('Incorrect data passed');

    req.session.inputData = {
      isError: true,
      errorMessage: 'Invalid data entered',
      email: enteredEmail,
      confirmEmail: enteredConfirmationEmail,
      password: enteredPassword,
    }

    return res.redirect('/signup')
  }

  try {
    const userExists = await db.getDb().collection('users').findOne({ email: enteredEmail });

    if (userExists) {
      console.log('user already exists');
      req.session.inputData = {
        isError: true,
        errorMessage: 'User already exists',
        email: enteredEmail,
        confirmEmail: enteredConfirmationEmail,
        password: enteredPassword,
      }
      req.session.save(() => {
        res.redirect('/signup');
      });
      return;
    }

  } catch (e) {
    console.log(e);
    return res.status(500).render('500');
  }

  const encryptedPassword = await bcryptjs.hash(enteredPassword, 12);

  const newUser = {
    email: enteredEmail,
    password: encryptedPassword,
  }

  try {
    const response = await db.getDb().collection('users').insertOne(newUser);

    if (response) {
      req.session.user = { id: response.insertedId, email: enteredEmail }
      req.session.isAuth = true;

      req.session.save(() => {
        res.redirect('/profile');
      })
    }

  } catch (e) {
    console.log(e);
    return res.redirect('/signup');
  }
});

router.post('/login', async function (req, res) {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;

  try {
    const existingUser = await db.getDb().collection('users').findOne({ email: enteredEmail });

    if (!existingUser) {
      req.session.inputData = {
        isError: true,
        errorMessage: `Wrong credentials! (${enteredEmail} doesn't exist)`,
        email: enteredEmail,
        password: enteredPassword,
      }

      req.session.save(() => {
        res.redirect('/login');
      })

      return;
    }

    const passwordsAreMatching = await bcryptjs.compare(enteredPassword, existingUser.password);

    if (!passwordsAreMatching) {
      req.session.inputData = {
        isError: true,
        errorMessage: 'Wrong credentials! (wrong password)',
        email: enteredEmail,
        password: enteredPassword,
      }

      req.session.save(() => {
        res.redirect('/login');
      })

      return;
    }

    req.session.user = { id: existingUser._id, email: existingUser.email }
    req.session.isAuth = true;

    req.session.save(() => {
      res.redirect('/profile');
    });

  } catch (e) {
    console.log(e);
    return res.status(500).render('500');
  }
});

router.get('/admin', async function (req, res) {
  if (!res.locals.isAuth) return res.status(401).render('401');
  if (!res.locals.isAdmin) return res.status(403).render('403');

  res.render('admin');
});

router.get('/profile', function (req, res) {
  if (!res.locals.isAuth) return res.status(401).render('401');
  res.render('profile');
});


router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.isAuth = false;

  req.session.save(() => {
    res.redirect('/');
  });

});

module.exports = router;
