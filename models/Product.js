var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema ({
	bookId: {
		type: String,
		required: true
	},
	quantity:{
		type: Number,
		required: true
	},
	cartId:{
		type: String,
		required: true
	},
})

var Product = mongoose.model('Product', productSchema);

module.exports = Product;