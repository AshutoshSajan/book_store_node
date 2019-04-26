var express = require('express');
var router = express.Router();
var User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/login', function(req, res, next) {
	res.render('signIn');
});

router.post('/login', function(req, res, next) {
	const password = req.body.password;
	User.findOne({email: req.body.email}, (err, user) => {
			console.log(user, "user....................................");
		if(err){
			next(err);
			return res.redirect('/users/login');
		}else if(user == null){
			res.redirect('/users/login');
			return;
		}else {
			const result = bcrypt.compareSync(password, user.password)
			if(!result){
				console.log(result, "password did not match");
				res.redirect('/users/login');
				return;
			}else if(result){
				console.log(result, "pasword match succesull");
				res.redirect('/');
				return;
			};
		}
	})
});

router.get('/register', function(req, res, next) {
	res.render('signUp');
});

router.post('/register', function(req, res, next) {
	var user = req.body;
	User.create(user, (err, user) => {
		if(err) return res.redirect('/users/register');
		res.redirect('/');
	})
});

module.exports = router;
