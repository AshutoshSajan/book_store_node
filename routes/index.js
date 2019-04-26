var express = require('express');
var router = express.Router();
var Book = require('../models/Book');

router.get('/', function(req, res, next) {
	console.log(req.session, "session in home..............................")
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
});

module.exports = router;
