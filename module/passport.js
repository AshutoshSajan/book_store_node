var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Author = require('../models/Author');

var keys = require('../keys');
console.log(keys,"keys....................................")

passport.use(new GoogleStrategy({
    clientID: keys.keys.clientID,
    clientSecret: keys.keys.clientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile.email);
    // Check for email in local database received from profile
    // if yes
    // return author
    // if no
    // create author in local database based on info from profile, return it
    Author.findOne({email: profile.emails[0].value }, (err, author) => {
      if(err) { return done(null, null) }
      if(author){
        // console.log(author,"..............................")
        return done(null, author);
      }
    	if(!author) {
    		console.log(profile, "profile....................................")
    		Author.create({
    			name: profile.displayName,
    			email: profile.emails[0].value,
    			image: profile.photos[0].value,
    		},(err, author) => {
    			if(err) { return done(err, null) };
    			done(null, author);
    		})
    	}	
    })
  }
));

// serialize user
passport.serializeUser((author, done) => {
	done(null, author._id);
})


// // deserialize author
passport.deserializeUser((id, done) => {
	// get author from loca database
	// return done(err, user)
	Author.findById(id, function(err, author) {
    if(err) return done(err, null);
    // console.log(author,"author in deserializeuser..................................")
    done(null, author);
  });
})