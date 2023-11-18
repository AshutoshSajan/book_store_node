var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var Author = require('../models/Author');

// var keys = require('../keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // Check for email in local database received from profile
      // if yes return author
      // if not create author in local database based on info from profile, return it
      console.log({ profile });

      Author.findOne(
        {
          email: profile.emails[0].value,
        },
        (err, author) => {
          if (err) {
            return done(null, null);
          }
          if (author) {
            return done(null, author);
          }
          if (!author) {
            Author.create(
              {
                name: profile.displayName,
                email: profile.emails[0].value,
                image: profile.photos[0].value,
              },
              (err, author) => {
                if (err) {
                  return done(err, null);
                }
                done(null, author);
              }
            );
          }
        }
      );
    }
  )
);

// serialize user
passport.serializeUser((author, done) => {
  done(null, author._id);
});

// // deserialize author
passport.deserializeUser((id, done) => {
  // get author from loca database
  // return done(err, user)
  Author.findById(id, function (err, author) {
    if (err) return done(err, null);
    done(null, author);
  });
});
