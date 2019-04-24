var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Author = require('../models/Author');


/* GET home page. */
router.get('/', function(req, res, next) {
	Book.find({}, (err, books) => {
		if(err) next(err);
		console.log(books, "inside index.js all books..............................");
  	res.render('index', { books: books });
	})
});

module.exports = router;
