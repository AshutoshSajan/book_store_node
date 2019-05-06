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

	edit_Item: function(req, res, next){
		console.log("edit cart item...................")
		var id = req.params.id;
		console.log(id, "id.........................")
		Product.findOne({_id: id}, (err, item) => {
			if(err) return next(err);
			console.log(item, 'edit item..................................');
			res.locals.item = item;
			res.status(200).redirect('/');
		})
		console.log("remove cart item")
	},

	update_Item: function(req, res, next){
		console.log("cart updated....................");
		// var id = req.params.id;
		// console.log(id, "id.........................")
		// Product.findOne({_id: id, (err, item) => {
		// 	if(err) return next(err);
		// 	console.log(item, 'item removed');
		// 	res.status(200).render('index');
		// })
		// console.log("remove cart item")
	},

	remove_Item: function(req, res, next) {
		var id = req.params.id;
		console.log(id, "id.........................")
		Product.findByIdAndDelete({_id: id}, (err, item) => {
			if(err) return next(err);
			console.log(item, 'item removed');
			res.redirect('/')
		})
		console.log("remove cart item")
	},

	order: function(req, res, next) {
		console.log("order cart item")
	}
}