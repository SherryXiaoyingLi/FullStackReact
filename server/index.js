// initial app setup
const express = require('express');
const mongoose = require('mongoose');

const cookieSession = require('cookie-session');
const passport = require('passport');
// cookieSession required to get access to cookie; passport required to tell passport to use cookie

const keys = require('./config/keys');
require('./models/User'); // ** notice the order, this file defines the User model, and passport.js 
                            // has to come later to use that User model
require('./services/passport'); 
// b/c passport.js not returning everything, dont need assign to var, just want code executed


mongoose.connect(keys.mongoURI);

const app = express(); // by calling express like a function, generate a new express application
                        // e.g. the route handlers we write associated with this express app

// middleware
app.use(
cookieSession({
        maxAge: 30 * 24 * 60 * 60 *  1000, // max cookie life passed in as miliseconds, so this is 30 days
        keys: [keys.cookieKey] // used to sign or encrypt cookie, can specify multiple keys
    })
);
// access cookie in app

// middleware
app.use(passport.initialize());
app.use(passport.session());
// tell passport to use cookie in app

require('./routes/authRoutes')(app);
// require gives back a function exported from authRoutes.js 
// immediately call that function w/ argument app

// # dynamic port binding
const PORT = process.env.PORT || 5000;
// Heroku specifies a port that incoming request can go thru b/c it has one server for many things
// When Heroku runs an app deployed onto it, it specifies env var that is the underlying env that node runs on top of
// these configurations given by Heroku right before app starts  

// env.PORT might only assigned by Heroku on production env, dev env (our machine) may not so use OR statement

app.listen(PORT);
// express tells NODE to listen on port # 

