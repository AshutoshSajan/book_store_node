var Book = require('../models/Book');

module.exports = {
	home: function(req, res, next) {
		if(req.session && req.session.userId){
			Book
			.find()
			.populate('author', 'name')
			.exec((err, books) => {
				if(err) return next(err);
				res.render('index', { books: books });
			});	
		}else if(!req.session.userId){
			return res.redirect('/users/login');
		}
	},
}