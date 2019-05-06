var Book = require('../models/Book');
var User = require('../models/User');
var Author = require('../models/Author');
var Cart = require('../models/Cart');
const bcrypt = require('bcrypt');

module.exports = {
	All_Books:function(req,res,next) {
		Book.find({}, (err, books) => {
			if(err) return next(err);
			res.json(books);
		})
	},
	single_Book:function(req,res,next) {
		Book.findOne({title: req.params.name}, (err, books) => {
			if(err) return next(err);
			res.json(books);
		})
	},
	authors:function(req,res,next) {
		Author.find({}, (err, authors) => {
			if(err) return next(err);
			res.json(authors);
		})
	},
	single_Author:function(req,res,next) {
		Author.findOne({name: req.params.name}, (err, author) => {
			if(err) return next(err);
			res.json(author);
		})
	},
	users:function(req,res,next) {
		User.find({}, (err, users) => {
			if(err) return next(err);
			res.json(users);
		})
	},
	single_User:function(req,res,next) {
		User.findOne({name: req.params.name}, (err, user) => {
			if(err) return next(err);
			res.json(user);
		})
	}
}