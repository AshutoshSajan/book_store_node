var Author = require('../models/Author');
var Book = require('../models/Book');

module.exports = {
	id : "",
	authors_Form: function (req, res, next) {
		res.render("author_Form", {author: null});
	},

	add_Authors: function (req, res, next) {
		// console.log(req.body,"inside add author...............................")
		Author.create(req.body, (err, author) => {
		if (err) return next(err);
			res.redirect('/');
		})
	},

	list_Books: function (req, res, next) {
		// console.log(req.author, "author in list books...........................");
		Book
		.find({author: req.author._id})
		.sort({created: -1})
		.exec((err, books) => {
			if (err) { return next(err) };
			// console.log(books, "books in list books....................");
			res.render("listBooks", { books });
		})
	},

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

	edit_Author: function(req, res, next){
		this.id = req.params.id;
		Author.findById(this.id, (err, author) => {
			if(err) return next(err);
			res.render("author_Form", { author });
		})
	},

	update_Author: function(req, res, next){
		Author.findByIdAndUpdate(this.id, req.body, (err, author) => {
			if(err) return next(err);
			res.status(200).redirect("/authors/show-authors");
		})
	},

	delete_Author: function (req, res, next) {
		var id = req.params.id;
		Author.findByIdAndDelete({_id:id}, (err, authors) => {
			if (err) return next(err);
			res.render("listBooks", { authors });
		})
	}
}