var User = require('../models/User');
var Book = require('../models/Book');
// var Cart = require('../models/Cart');

module.exports = {
	home: function (req, res, next) {
		var user = req.user;
		console.log(user, "req user........................")
		var cartItem = req.flash("item");
		const err = req.flash('err');
		var id = req.user ? req.user._id : req.author ? req.author._id : null;
		Book
			.find()
			.populate('author', 'name')
			.exec((err, books) => {
				if (err) return next(err);

				User.findOne({
						_id: id
					})
					.populate({
						path: 'cartId',
						populate: [{
							path: 'product',
							model: 'Product',
							populate: {
								path: "bookId",
								model: "Book",
							}
						}]
					})
					.exec((err, products) => {
						if (err) return next(err);
						res.locals.products = products;
						res.locals.cartItem = cartItem.length ? cartItem[0] : null;
						// if(user){}
						// Cart
						// .findOne({_id: req.user.cartId}, (err, item) => {
						// 	if(err) return next(err);
						// })
						res.render('index', {
							books
						});
					})
			});
	},
}