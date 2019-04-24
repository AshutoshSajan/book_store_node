var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Book = require("./Book");

var authorSchema = new Schema ({
	name: String,
	description: String,
	email: String,
	age: Number,
	books: [Schema.Types.ObjectId]
})

var Author = mongoose.model('Author', authorSchema)

module.exports = Author;