var mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var bookSchema = new Schema ({
	title: {type: String, required: true},
	description: {type: String, required: true},
	likes: {type: Number, default: 0},
	author: String,
	created: { type: Date, default: new Date() },
	time: { type:String, default: new Date().toLocaleTimeString() },
	tags: [String],
})

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;

