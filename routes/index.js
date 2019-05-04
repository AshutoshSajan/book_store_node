var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var indexController = require('../controllers/indexController.js');
var authController = require('../controllers/authController');

router.get('/', indexController.home);

// router.get('/', function(req, res, next) {
// 	const err = req.flash('err');
// 	console.log(err, "index err msg");
// 	console.log(req.user, "user product inside index");
// 	// console.log(req.user, "in index router.........................");
// 	Book
// 	.find()
// 	.sort({created: -1})
// 	.populate('author', "name")
// 	.exec((err, books) => {
// 		if(err) return next(err);
// 		// console.log(books, "books in index router.............................");
// 		// res.locals.products = req.user.products;
// 		// console.log(req.user.products ,'req.user.products...............in index')
// 		res.render('index', { books: books, error: (err && err.length) ? err[0] : null });
// 	});	
// });

module.exports = router;