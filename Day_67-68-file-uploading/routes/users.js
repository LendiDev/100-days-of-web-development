const express = require('express');
const multer = require('multer');

const db = require('../data/database');

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storageConfig });
const router = express.Router();

router.get('/', async function (req, res) {
  const users = await db.getDb().collection('users').find().toArray();

  if (!users || users.length === 0) {
    console.log('no users data available');
    res.status(404).send('no users');
  }

  res.render('profiles', {users});
});

router.get('/new-user', function (req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'), async function (req, res) {
  const uploadedImageFile = req.file;
  const userData = req.body;

  try {
    const response = await db.getDb().collection('users').insertOne({ name: userData.username, imagePath: uploadedImageFile.path });
    console.log(response);
    return res.redirect('/');
  } catch (e) {
    console.log(e);
  }

  res.status(404).send('something went wrong');
});

module.exports = router;