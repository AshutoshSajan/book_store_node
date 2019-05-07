var Cart = require('../models/Cart');
var User = require('../models/User');
var Product = require('../models/Product');
const bcrypt = require('bcrypt');

module.exports = {
	add_Items: function(req, res, next) {
		var data = req.body;
		Cart
		.findOne({_id: req.user.cartId })
		.populate([{
			path:"product",
		}])
		.exec((err, item) => {
			if(err) return next(err);
			const product = item.product.find((element) => {
				console.log(element.bookId, req.body.bookId)
				return String(element.bookId) === String(req.body.bookId)
			})

			if (product) {
				Product
					.findOneAndUpdate({_id: product._id},
					{$inc: { quantity: req.body.quantity}},
					(err, item) => {
				 		if(err) return next(err);
				 		res.status(200).redirect('/');
					})
			} else {
				Product.create(req.body, (err, response) => {
					if (err) return next(err);
					Cart
					.findOneAndUpdate(
					{_id: req.user.cartId},
					{$push: { product: response._id }})
					.exec((err, item) => {
						if(err) return next(err);
							res.status(200).redirect('/')
						})	
				})	
			}
		})
	},

	edit_Item: function(req, res, next){
		var id = req.params.id;
		Product.findOne({_id: id}, (err, item) => {
			if(err) return next(err);
			req.flash("item", item);
			res.status(200).redirect('/');
		})
	},

	update_Item: function(req, res, next){
		Product.findByIdAndUpdate({_id: req.body.id}, req.body, (err, item) => {
			if(err) return next(err);
			res.locals.cartItem = null;
			res.status(200).redirect('/');
		})
	},

	remove_Item: function(req, res, next) {
		const id = req.params.id;

		Product.findByIdAndDelete({_id: id}, (err, item) => {
			if(err) return next(err);
			console.log(item, 'item removed');
			Cart
			.findOne({_id: req.user.cartId}, (err, item) => {
				if(err) return next(err);				
				const match = item.product.find(uid => {
					return String(uid) === String(id);
				})
				if(match){
					Cart
						.findOneAndUpdate(
						{_id: req.user.cartId},
						{$pull: {product: id}},
						(err, item) => {
							res.status(200).redirect('/');
					})
				}
			})
		})
	},
}