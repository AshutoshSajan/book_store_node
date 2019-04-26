var express = require('express');
var router = express.Router();
var Author = require('../models/Author');

router.get('/', function (req, res, next) {
	res.render("author");
})

router.post('/', function (req, res, next) {
		var data = req.body;
		Author.create(data, (err, author) => {
		if (err) return next(err);
		res.redirect('/');
	})
})

router.get('/show-authors', function (req, res, next) {
	Author.find({}, (err, authors) => {
		if (err) return next(err);
		res.render("showAuthors", { authors });
	})
})

router.get('/:id/books', function (req, res, next) {
	var id = req.params.id;
	Author
	.findOne({_id: id})
	.populate("books")
	.exec((err, author) => {
		if(err) return next(err);
		res.render("author_books", { author: author });
	})
})
 
router.get('/:id/delete', function (req, res, next) {
	var id = req.params.id;
	Author.findByIdAndDelete({_id:id}, (err, authors) => {
		if (err) return next(err);
		res.render("showAuthors", { authors });
	})
})      

module.exports = router;
