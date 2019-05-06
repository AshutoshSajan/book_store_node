var Book = require('../models/Book');
var Author = require('../models/Author');

module.exports = {
	id: "",
	book_Form:  function(req, res, next) {
		Author.find({}, 'name', (err, authors) => {
			if(err) return next(err);
	  	res.render('form', {authors: authors});
		})
	},

	add_Book: function(req, res, next) {
		if(req.body.title) {
			Book.create(req.body, (err, book) => {
				if(err) return next(err);
				Author.findByIdAndUpdate(book.author, {$push: {books: book._id}}, {new: true}, (err, author) => {
					if(err) return next(err);
					res.redirect('/');
				})
			})
		} else res.redirect('/');
	},

	edit_Book: function(req, res, next) {
		console.log(req.author, req.user, "author and user id..................................");
		this.id = req.params.id;
		Book.findOne({_id: id}, (err, book) => {
			if(err) { return next(err) };
			if(req.author._id.equals(book.author)){
				console.log(req.author._id, "req author id", book.author, "book author", book, "book...")
				res.render("update", {book: book});
			}else{
				req.flash("err", "You are not authorized to edit this book.");
				console.log("err", "You are not authorized to edit this book.");
				res.status(401).redirect('/');
			}
		})
	},

	update_Book: function(req, res, next) {
		Book.findOneAndUpdate({_id: this.id}, req.body, (err, book) => {
			if(err) return next(err);
			res.redirect("/");
		})
	},

	book_Details: function(req, res, next) {
		Book
		.findOne({_id: req.params.id})
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
	},

	delete_Book: function(req, res, next) {
		Book.findOne({_id: req.params.id}, (err, book)=> {
			if(err) {return next(err)};
			if(req.author._id.equals(book.author)){
				Book.findByIdAndDelete({_id: req.params.id}, (err, book) => {
					if(err) { return next(err) };
					res.redirect("/");
				})
			}else {
				req.flash("err", "You are not authorized to delete this book");
				res.status(401).redirect('/');
			}
		})
	}
}