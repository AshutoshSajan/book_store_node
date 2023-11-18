var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    image: {
      type: String,
      default: '../public/images/user.png',
    },
  },
  {
    timestamps: true,
  }
);

var Author = mongoose.model('Author', authorSchema);

module.exports = Author;
