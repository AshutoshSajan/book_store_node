var Book = require('../../models/Book');

module.exports = {
  All_Books: function (req, res, next) {
    Book.find({}, (err, books) => {
      if (err) return next(err);
      res.json(books);
    });
  },

  create_Book: function (req, res, next) {
    Book.create(req.body, (err, book) => {
      if (err) return next(err);
      res.json(book);
    });
  },

  get_Book: function (req, res, next) {
    Book.findOne(
      {
        _id: req.params.id,
      },
      (err, books) => {
        if (err) return next(err);
        res.json(books);
      }
    );
  },

  update_Book: function (req, res, next) {
    Book.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      (err, authors) => {
        if (err) return next(err);
        res.json(authors);
      }
    );
  },

  delete_Book: function (req, res, next) {
    Book.findOneAndDelete(
      {
        _id: req.params.id,
      },
      (err, author) => {
        if (err) return next(err);
        res.json(author);
      }
    );
  },
};
