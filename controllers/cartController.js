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

	// add_Items: function(req, res, next) {
	// 	// console.log( req.user, "req.user.................");
	// 	// console.log(req.body, "cart body...........................")
	// 	// var id = req.author._id
	// 	var data = req.body;
	// 	Product.create(data, (err, item) => {
	// 		if(err) return next(err);
	// 		console.log(item, "product item inside cart.......................")
	// 		Cart.findByIdAndUpdate({_id: req.user.cartId}, {$push: {product: item._id}}, {new: true}, (err, cart) => {
	// 			console.log( "book added into the cart.................");
	// 			res.status(200).redirect('/');
	// 		})
	// 	})
	// },

	add_Items: function(req, res, next) {
		// console.log( req.user, "req.user.................");
		// console.log(req.body, "cart body...........................")
		// var id = req.author._id
		var data = req.body;

		Product.findOne({bookId: req.body.bookId }, (err, product) => {
			if (err) return next(err);
			if(product){
				Product.findOneAndUpdate(
					{_id: product._id },
					{$inc: {quantity: req.body.quantity}}, (err, item) => {
					if(err) return next(err)
					res.redirect('/');
				})
			}else {
				Product.create(data, (err, item) => {
					if(err) return next(err);
					console.log(item, "product item inside cart.......................")
					Cart.findByIdAndUpdate(
						{_id: req.user.cartId},
						{$push: {product: item._id}}, {new: true},
						(err, cart) => {
						if(err) return next(err);
						console.log( cart , "book added into the cart.................");
						res.status(200).redirect('/');
					})
				})
			}
		})

	},

	// add_Items: function(req, res, next) {
	// 	// console.log( req.user, "req.user.................");
	// 	console.log(req.body, "cart body...........................")
	// 	// var id = req.author._id
	// 	var data = req.body;
	// 	// Product.create(data, (err, item) => {
	// 	// 	if(err) return next(err);
	// 	// 	console.log(item, "product item inside cart.......................")
	// 		Cart
	// 		.find()
	// 		.populate([{
	// 				path: 'product',
	// 				model: 'Product'
	// 			}])
	//     .exec((err, product) => {
	// 			if (err) return next(err);
	// 			product.forEach(v => {
	// 				// console.log(v, "v...................");
	// 				v.product.forEach(val => {
	// 					// console.log(val, "val...........................")
	// 					if(val.bookId.equals(req.body.bookId)){
	// 						const id = val._id;
	// 						// console.log("yup.............");
	// 						Product
	// 						.findOneAndUpdate(
	// 							{_id: id }, 
	// 							{$inc: {quantity: req.body.quantity} },
	// 							 (err, quantity) => {
	// 							 	console.log(quantity,'quantity..........................')
	// 							if(err) return next(err);
	// 							// console.log(quantity, "quantity....................")
	// 							// res.json(quantity)
	// 							res.redirect('/');
	// 						})
	// 					}
	// 				});
	// 			});
	//       // console.log(product, 'pop, products.............................');
	//     })
	// 	// })
	// },

	//{$push: {product: item._id}},
	// 			{new: true}, (err, cart) => {
	// 			console.log( "book added into the cart.................");
	// 			res.status(200).redirect('/');

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