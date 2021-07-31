const user = require('./../controller/user');
const express = require('express');
const router = express.Router();

router.post('/', user.create);
router.patch('/:id', user.update);
router.delete('/:id', user.delete);

module.exports = router;
