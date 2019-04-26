var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Author = require('../models/Author');

router.get('/', function(req, res, next) {
	Author.find({}, 'name', (err, authors) => {
		if(err) return next(err);
  	res.render('form', {authors: authors});
	})
});

router.post('/', function(req, res, next) {
	var data = req.body;
	if(req.body.title) {
		Book.create(data, (err, book) => {
			if(err) return next(err);
			Author.findByIdAndUpdate(book.author, {$push: {books: book._id}}, {new: true}, (err, author) => {
				if(err) return next(err);
				res.redirect('/');

			})
		})
	} else res.redirect('/');
});

router.get('/:id/delete', function(req, res, next) {
	var id = req.params.id;
	Book.findByIdAndDelete({_id: id}, (err, book) => {
		if(err) return next(err);
		res.redirect("/");
	})
});
var id ;
router.get('/:id/update', function(req, res, next) {
	id = req.params.id;
	Book.findOne({_id: id}, (err, book) => {
		if(err) return next(err);
		res.render("update", {book: book});
	})
});

router.post('/:id/update-book', function(req, res, next) {
	var data = req.body
	Book.findOneAndUpdate({_id: id}, data, (err, book) => {
		if(err) return next(err);
		res.redirect("/");
	})
});

router.get('/:id/details', function(req, res, next) {
	id = req.params.id;
	Book
	.findOne({_id: id})
	.populate({
		path: 'author',
		populate: [{
			path: 'books',
			model: 'Book',
		}]
	})
	.exec((err, book) => {
		if(err) return next(err)
		res.render('details', { book: book })
	})
	
});

module.exports = router;
