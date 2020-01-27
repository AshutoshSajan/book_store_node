var User = require('../../models/User');

module.exports = {
	All_Users: function (req, res, next) {
		User.find({}, (err, Users) => {
			if (err) return next(err);
			res.json(Users);
		})
	},
	create_User: function (req, res, next) {
		User.create(req.body, (err, User) => {
			if (err) return next(err);
			console.log(User, "api create User")
			res.json(User);
		})
	},
	get_User: function (req, res, next) {
		User.findOne({
			_id: req.params.id
		}, (err, Users) => {
			if (err) return next(err);
			res.json(Users);
		})
	},
	update_User: function (req, res, next) {
		console.log("api put")
		User.findByIdAndUpdate({
				_id: req.params.id
			},
			req.body, (err, authors) => {
				if (err) return next(err);
				res.json(authors);
			})
	},
	delete_User: function (req, res, next) {
		console.log("api delete")
		User.findOneAndDelete({
			_id: req.params.id
		}, (err, author) => {
			if (err) return next(err);
			res.json(author);
		})
	},
}