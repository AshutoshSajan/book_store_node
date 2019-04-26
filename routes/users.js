var express = require('express');
var router = express.Router();
var User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/login', function(req, res, next) {
	res.render('signIn');
});

router.post('/login', function(req, res, next) {
	console.log(req.session, "session..............................")
	const password = req.body.password;
	User.findOne({email: req.body.email}, (err, user) => {
			console.log(user, "user....................................");
		if(err) return res.status(500).redrect('/users/login');
		if(!user) return res.status(400).send("User not found");
		if(user){
			const result = bcrypt.compareSync(password, user.password)
			if(!result){
				return res.status(400).send("Wrong password");
			}else if(result){
				console.log(result, "pasword match succesull");
				req.session.userId = user._id;
				return res.status(200).redirect('/');
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

router.get('/logout', function(req, res, next) {
	req.session.destroy();
	res.redirect('/users/login');
})

module.exports = router;
