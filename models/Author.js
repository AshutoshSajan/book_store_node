var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema ({
	name: {type: String, required: true },
	description: String,
	email: String,
	age: Number,
	books: [{type: Schema.Types.ObjectId, ref: 'Book'}]
})

var Author = mongoose.model('Author', authorSchema);

module.exports = Author;