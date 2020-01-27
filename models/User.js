var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var multer = require('multer')
var upload = multer({
	dest: 'uploads/'
});

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

var userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 20
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 16
	},
	avatar: {
		data: Buffer,
		contentType: String
	},
	cartId: {
		type: Schema.Types.ObjectId,
		ref: 'Cart'
	}
}, {
	timestamps: true
})

userSchema.pre('save', function (next) {
	if (this.password) {
		this.password = bcrypt.hashSync(this.password, salt)
	}
	next()
})

var User = mongoose.model('User', userSchema);
module.exports = User;