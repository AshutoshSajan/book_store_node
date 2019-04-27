var Author = require('../models/Author');

module.exports = {

	authors_Form: function (req, res, next) {
		res.render("author");
	},

	add_Authors: function (req, res, next) {
		var data = req.body;
		Author.create(data, (err, author) => {
		if (err) return next(err);
			res.redirect('/');
		})
	},

	show_Authors: function (req, res, next) {
	Author.find({}, (err, authors) => {
		if (err) return next(err);
		res.render("showAuthors", { authors });
	})},

	author_Books: function (req, res, next) {
		var id = req.params.id;
		Author
		.findOne({_id: id})
		.populate("books")
		.exec((err, author) => {
			if(err) return next(err);
			res.render("author_books", { author: author });
		})
	},

	delete_Author: function (req, res, next) {
		var id = req.params.id;
		Author.findByIdAndDelete({_id:id}, (err, authors) => {
			if (err) return next(err);
			res.render("showAuthors", { authors });
		})
	}
}