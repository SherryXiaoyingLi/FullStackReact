const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
// recall in models/User.js when call mongoose.model w/ 2 arguments, create new model
// w/ 1 argument, fetch model 


passport.serializeUser((user, done)=>{
    done(null, user.id); 
    // done func call after having successfully serialize user (which is just to retrieve the user.id here) to pass the info to be set to cookie
    // 1st error msg
    // 2nd unique identifying info of cookie - use mongoDB's identifier for user, instead of googleId (profile id)
    // reason not use profile id is - can have user not having googleId (e.g. only facebookId) but must having id
    // also aouth only to allow sign in (use profile id), after sign in dont care anymore use internal id (mongoDB identifier)
})
// directly define passport's serialize function to generate cookie w/ user (will be the existingUser or the newly created User) and done as specified by passport's error function
// this func will get called when time comes

passport.deserializeUser((id, done)=>{
    User.findById(id) // everytime interact w/ mongoDB always async op
        .then(user=>{
            done(null, user);
        })
})


passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback', 
        // after user grant google permission, google will redirect to this url of the app
        proxy: true // tell google strategy, if our app runs through any proxy (heroku uses proxy), that's fine, 
        // don't change the callback url from https:// to http://
    }, 
        (accessToken, refreshToken, profile, done)=>{
            // when everything w/ google authentication done (following the two routes below)
            // google gives back user information via here
            User.findOne({googleId: profile.id})
            .then((existingUser)=>{
                if (existingUser) {
                    done(null, existingUser);
                    // 1st error msg, 2nd exisiting user
                    // done a common func in passport to specify sth done
                    // here as the 4th arg for app to specify auth done
                } else {
                    // returned existingUser is null
                    new User({googleId: profile.id})
                    .save()
                    // create a new instance in express API, and save it to mongoDB
                    .then(user=>done(null, user));
                    // since this process async op too, need promise handling
                    // the promise will return a user that points to the same underlying structure created
                }

            })
            // Mongoose query see if user already exists
            // return a promise (deal w/ async operation)
            
        })
        
);