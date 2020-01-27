var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var Author = require('./Author');

var bookSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	pages: {
		type: Number,
		default: 0
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'Author',
		required: true
	},
	created: {
		type: Date,
		default: new Date()
	},
	tags: [String],
	price: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;