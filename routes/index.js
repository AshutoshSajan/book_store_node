var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var indexController = require('../controllers/indexController.js');
var authController = require('../controllers/authController');

router.get('/', indexController.home);

// router.get('/', function (req, res, next) {
//   const err = req.flash('err');
//   Book.find()
//     .sort({ created: -1 })
//     .populate('author', 'name')
//     .exec((err, books) => {
//       if (err) return next(err);
//       // res.locals.products = req.user.products;
//       res.render('index', {
//         books: books,
//         error: err && err.length ? err[0] : null,
//       });
//     });
// });

module.exports = router;
