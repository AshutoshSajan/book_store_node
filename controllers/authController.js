var User = require('../models/User');
var Author = require('../models/Author');

exports.isUserLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) {
  	User.findById(req.session.userId, (err, user) => {
  		if(err) return next(err);
  		req.user = user;
  		res.locals.user = user;
    	next();
  	})
  }else {
    res.redirect("/users/login");
  }
}

exports.sessions = (req, res, next) => {
	if (req.session && req.session.userId) {
  	User.findOne({_id: req.session.userId}, (err, user) => {
  		if(err) return next(err);
  		req.user = user;
  		res.locals.user = user;
      next();
  	})
  }else {
  	req.user = null;
  	res.locals.user = null;
  	next();
  }
}

// ==================================================================

exports.isAuthorLoggedIn = (req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    Author.findOne({ _id: req.session.passport.user }, (err, user) => {
      if(err) return next(err);
      req.author = user;
      res.locals.author = user;
      next();
    })
  }else {
    res.redirect("/");
  }
}

exports.googleSessions = (req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    Author.findOne({ _id: req.session.passport.user }, (err, user) => {
      if(err) return next(err);
      req.author = user;
      res.locals.author = user;
      next();
    })
  }else {
    req.author = null;
    res.locals.author = null;
    next();
  }
}