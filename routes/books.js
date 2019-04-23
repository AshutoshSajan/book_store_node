var express = require('express');
var router = express.Router();
var Book = require('../models/Book');

router.get('/', function(req, res, next) {
  res.render('form');
});

router.post('/', function(req, res, next) {
	var data = req.body;
	console.log(req.body, "inside book created...............................")
	if(req.body.title) {
		Book.create(data, (err, book) => {
			if(err) return next(err);
			res.redirect('/');
		})
	} else res.redirect('/');
});

router.get('/:id/delete', function(req, res, next) {
	var id = req.params.id;
	Book.findByIdAndDelete({_id: id}, (err, book) => {
		if(err) console.log(err);
		res.redirect("/");
	})
});
var id ;
router.get('/:id/update', function(req, res, next) {
	id = req.params.id;
	console.log(id, "c");
	Book.findOne({_id: id}, (err, book) => {
		if(err) console.log(err);
		console.log(book);
		res.render("update", {book: book});
	})
});

router.post('/:id/update-book', function(req, res, next) {
	var data = req.body
	console.log(id, "in update-book....................................");
	Book.findOneAndUpdate({_id: id}, data, (err, book) => {
		if(err) console.log(err);
		console.log(book,"book in update book route................................");
		res.redirect("/");
	})
});

router.get('/:id/details', function(req, res, next) {
	id = req.params.id;
	console.log(id, "in details");
	Book.findOne({_id: id}, (err, book) => {
		if(err) console.log(err);
		console.log(book);
		res.render("details", {book: book});
	})
});

// /books/<%= book._id %>/details


module.exports = router;
