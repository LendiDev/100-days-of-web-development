const express = require('express');

const router = express.Router();

router.get('/404', (req, res) => {
  res.status(404).render('404');
});

router.use((req, res) => {
  res.status(404).render('404');
})

router.use((error, req, res, next) => {
  console.log(error);
  res.status(500).render('500');
})

module.exports = router;