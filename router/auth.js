const auth = require('./../controller/auth');
const user = require('./../controller/user');

const express = require('express');
const router = express.Router();

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/users', auth.getAll);
router.get('/user/:id', auth.getOne);
router.get('/unknown', user.getAll);
router.get('/unknown/:id', user.getOne);

module.exports = router;
