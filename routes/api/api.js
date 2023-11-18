var express = require('express');
var router = express.Router();

var bookApi = require('./books');
var userApi = require('./users');
var authorApi = require('./authors');

router.use('/books', bookApi);
router.use('/users', userApi);
router.use('/authors', authorApi);

module.exports = router;
