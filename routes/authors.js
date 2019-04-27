var express = require('express');
var router = express.Router();
var authorController = require('../controllers/authorController.js');

router.get('/', authorController.authors_Form);
router.post('/', authorController.add_Authors);
router.get('/show-authors', authorController.show_Authors);
router.get('/:id/books', authorController.author_Books);
router.get('/:id/delete', authorController.delete_Author);



// router.post('/', function (req, res, next) {
// 		var data = req.body;
// 		Author.create(data, (err, author) => {
// 		if (err) return next(err);
// 		res.redirect('/');
// 	})
// })

// router.get('/show-authors', function (req, res, next) {
// 	Author.find({}, (err, authors) => {
// 		if (err) return next(err);
// 		res.render("showAuthors", { authors });
// 	})
// })

// router.get('/:id/books', function (req, res, next) {
// 	var id = req.params.id;
// 	Author
// 	.findOne({_id: id})
// 	.populate("books")
// 	.exec((err, author) => {
// 		if(err) return next(err);
// 		res.render("author_books", { author: author });
// 	})
// })
 
// router.get('/:id/delete', function (req, res, next) {
// 	var id = req.params.id;
// 	Author.findByIdAndDelete({_id:id}, (err, authors) => {
// 		if (err) return next(err);
// 		res.render("showAuthors", { authors });
// 	})
// })      

module.exports = router;
