var User = require('../models/User');
var Cart = require('../models/Cart');
const bcrypt = require('bcrypt');

module.exports = {
  login_Form: function (req, res, next) {
    var err = req.flash('err');
    res.render('signIn', {
      error: err.length ? err[0] : null,
      result: req.flash('login').length ? req.flash('err')[0] : null,
    });
  },

  login: function (req, res, next) {
    User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (err) return res.status(500).redrect('/users/login');
        if (!user) {
          req.flash('err', 'Invalid email...');
          return res.status(400).redirect('/users/register');
        }
        if (user) {
          const result = bcrypt.compareSync(req.body.password, user.password);
          if (!result) {
            req.flash('err', 'Incorrect password');
            return res.status(400).redirect('/users/login');
          } else if (result) {
            console.info('Login successful');
            req.session.userId = user._id;
            req.flash('login', 'login successful');
            return res.status(200).redirect('/');
          }
        }
      }
    );
  },

  register_Form: function (req, res, next) {
    res.render('signUp');
  },

  register: function (req, res, next) {
    let newUser = req.body;

    let { name, email, password } = req.body;

    User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (err) {
          next(err);
          console.error(err, 'error while registering');
          // return res.status(400).redirect('/users/register');
        } else if (user) {
          return res.send('user already exist');
        } else if (!user) {
          User.create(newUser, (err, user) => {
            if (err) {
              next(err);
              console.error(err, 'error while registering');
              // return res.status(400).redirect('/users/register');
            }
            if (user) {
              Cart.create(
                {
                  userId: user._id,
                },
                (err, cart) => {
                  if (err) return next(err);
                  User.findByIdAndUpdate(
                    {
                      _id: user._id,
                    },
                    {
                      $set: {
                        cartId: cart._id,
                      },
                    },
                    {
                      new: true,
                    },
                    (err, user) => {
                      console.info(
                        'register successfully.....................'
                      );
                      req.session.userId = user._id;
                      res.redirect('/');
                    }
                  );
                }
              );
            }
          });
        }
      }
    );
  },

  logout: function (req, res, next) {
    req.session.destroy();
    res.redirect('/users/login');
  },
};
