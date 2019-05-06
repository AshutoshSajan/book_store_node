var User = require('../models/User');
var Book = require('../models/Book');

module.exports = {
	home: function(req, res, next) {
		if((req.session && req.session.userId) || (req.session.passport && req.session.passport.user)){
			const err = req.flash('err');
			var id = req.user ? req.user._id : req.author ? req.author._id : null;
			console.log(err, "index err msg");
			Book
			.find()
			.populate('author', 'name')
			.exec((err, books) => {
				if(err) return next(err);

				User.findOne({_id: id})
			 .populate({
					path: 'cartId',
					populate: [{
						path: 'product',
						model: 'Product',
						populate:{
							path: "bookId",
							model: "Book",
						}
					}]
				})
			 .exec((err, products) => {
					if(err) return next(err);
					console.log(products, "product in index..................")
					// req.user.products = products;
					// res.render('partials/cart', {products});
					res.locals.products = products
					res.render('index', { books });
				})

				// res.render('index', { books: books });
			});	
		}else return res.redirect('/users/login');
	},
}