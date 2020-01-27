var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('google');
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/authors/books')
  })

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;