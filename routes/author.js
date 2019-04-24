var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Author = require('../models/Author');

router.get('/', function (req, res, next) {
	Author.find({}, (err, books) => {
		err ? next(err): console.log(books, "all authors...........................");
		res.render("author");
	})
})

router.post('/', function (req, res, next) {
		var data = req.body;
		console.log(data);
		Author.create(data, (err, author) => {
		err ? next(err) : console.log(author);
		res.render('author');
	})
})

/* GET home page. */
// router.get('/', function(req, res, next) {
// 	Book.find({}, (err, books) => {
// 		if(err) next(err);
// 		// console.log(books, "inside index.js..............................");
//   	res.render('index', { books: books });
// 	})
// });

module.exports = router;
