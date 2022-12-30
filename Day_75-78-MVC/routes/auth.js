const express = require('express');

const AuthController = require('../controllers/auth.controllers');

const router = express.Router();

router.get('/signup', AuthController.getSignup);
router.get('/login', AuthController.getLogin);

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

module.exports = router;
