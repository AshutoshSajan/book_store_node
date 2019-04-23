var express = require('express');
var router = express.Router();
var Book = require('../models/Book');

/* GET home page. */
router.get('/', function(req, res, next) {
	Book.find({}, (err, books) => {
		if(err) next(err);
		// console.log(books, "inside index.js..............................");
  	res.render('index', { books: books });
	})
});

module.exports = router;
