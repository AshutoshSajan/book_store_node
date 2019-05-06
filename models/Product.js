var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema ({
	bookId: {
		type: Schema.Types.ObjectId,
		ref: 'Book',
		required: true
	},
	quantity:{
		type: Number,
		required: true
	},
	cartId:{
		type: Schema.Types.ObjectId,
		ref: 'Cart',
		required: true
	},
})

var Product = mongoose.model('Product', productSchema);

module.exports = Product;