const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// FINDS ID FROM THE MONGO DATBASE, THIS IS NOT THE GOOGLE ID. THIS IS CALLED AFTER USER IF FOUND WITH GOOGLE STRATEGY
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id)
     .then(user => {
        done(null, user)
    });
});

passport.use(
    new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId: profile.id})
        .then((existingUser) => {
            if(existingUser) {
                //We have a record of the user already
                done(null, existingUser);
            } else {
                //We dont have a record, create new record
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
            }
        })
      console.log('access token', accessToken); 
      console.log('refresh token', refreshToken); 
    })
  );