var Author = require('../../models/Author');
// var Book = require('../../models/Book');

module.exports = {
  All_Authors: function (req, res, next) {
    Author.find({}, (err, Authors) => {
      if (err) return next(err);
      res.json(Authors);
    });
  },

  create_Author: function (req, res, next) {
    Author.create(req.body, (err, Author) => {
      if (err) return next(err);
      res.json(Author);
    });
  },

  get_Author: function (req, res, next) {
    Author.findOne(
      {
        _id: req.params.id,
      },
      (err, Authors) => {
        if (err) return next(err);
        res.json(Authors);
      }
    );
  },

  update_Author: function (req, res, next) {
    Author.findByIdAndUpdate(
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

  get_Author_Books: function (req, res, next) {
    Author.findOne({
      _id: req.params.id,
    })
      .populate([
        {
          path: 'books',
        },
      ])
      .exec((err, books) => {
        if (err) return next(err);
        res.json(books);
      });
  },

  delete_Author: function (req, res, next) {
    Author.findOneAndDelete(
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
