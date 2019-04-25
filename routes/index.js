var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Author = require('../models/Author');


/* GET home page. */
router.get('/', function(req, res, next) {
	Book
	.find()
	.populate('author', 'name')
	.exec((err, books) => {
		// console.log(books, "books in index populate............................^^^^^");
		res.render('index', { books: books });
	});
});

module.exports = router;
