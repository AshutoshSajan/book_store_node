var Book = require('../../models/Book');

module.exports = {
	All_Books: function (req, res, next) {
		Book.find({}, (err, books) => {
			if (err) return next(err);
			res.json(books);
		})
	},
	create_Book: function (req, res, next) {
		Book.create(req.body, (err, book) => {
			if (err) return next(err);
			console.log(book, "api create book")
			res.json(book);
		})
	},
	get_Book: function (req, res, next) {
		Book.findOne({
			_id: req.params.id
		}, (err, books) => {
			if (err) return next(err);
			res.json(books);
		})
	},
	update_Book: function (req, res, next) {
		// console.log("api put")
		Book.findByIdAndUpdate({
				_id: req.params.id
			},
			req.body, (err, authors) => {
				if (err) return next(err);
				res.json(authors);
			})
	},
	delete_Book: function (req, res, next) {
		console.log("api delete")
		Book.findOneAndDelete({
			_id: req.params.id
		}, (err, author) => {
			if (err) return next(err);
			res.json(author);
		})
	},
}