var Cart = require('../models/Cart');
var User = require('../models/User');
var Product = require('../models/Product');
const bcrypt = require('bcrypt');

module.exports = {
	show_Cart: function(req, res, next) {
	 // console.log('show cart')
	 // User.findOne({_id: req.user._id})
	 // .populate({
		// 	path: 'cartId',
		// 	populate: [{
		// 		path: 'product',
		// 		model: 'Product',
		// 		populate:{
		// 			path: "bookId",
		// 			model: "Product",
		// 		}
		// 	}]
		// })
	 // .exec((err, products) => {
		// 	if(err) return next(err);
		// 	console.log(products, "product in cart..................")
		// 	req.user.products = products;
		// 	res.render('partials/cart', {products});
		// })
	},

	add_Items: function(req, res, next) {
		// console.log( req.user, "req.user.................");
		// console.log(req.body, "cart body...........................")
		// var id = req.author._id
		var data = req.body;
		Product.create(data, (err, item) => {
			if(err) return next(err);
			console.log(item, "product item inside cart.......................")
			Cart.findByIdAndUpdate({_id: req.user.cartId}, {$push: {product: item._id}}, {new: true}, (err, author) => {
				console.log( "book added into the cart.................");
				res.status(200).redirect('/');
			})
		})
	},

	edit_Items: function(req, res, next) {
		console.log("edit cart item")

	},

	remove_Items: function(req, res, next) {
		console.log("remove cart item")
	},

	order: function(req, res, next) {
		console.log("order cart item")
	}
}