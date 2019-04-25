var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Author = require('../models/Author');
var url = require("url");

router.get('/', function (req, res, next) {
	res.render("author");
})

router.post('/', function (req, res, next) {
		var data = req.body;
		Author.create(data, (err, author) => {
		err ? next(err) : console.log(author);
		res.redirect('/');
	})
})

router.get('/showAuthors', function (req, res, next) {
	Author.find({}, (err, authors) => {
		err ? next(err) : console.log(authors);
		res.render("showAuthors", { authors });
	})
})

router.get('/:id/books', function (req, res, next) {
	console.log(req.url, "url books");
	var id = req.params.id;
	console.log(id, "id in author books..............................")
	Author
	.findOne({_id: id})
	.populate("books")
	.exec((err, author) => {
		err ? next(err) : console.log(author, "inside author-books.....................");
		res.render("author_books", { author: author });
	})
})

module.exports = router;
