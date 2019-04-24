var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Author = require('../models/Author');

router.get('/', function (req, res, next) {
	res.render("author");
})

router.post('/', function (req, res, next) {
		var data = req.body;
		Author.create(data, (err, author) => {
		err ? next(err) : console.log(author);
		res.redirect('/');
	})
})

module.exports = router;
