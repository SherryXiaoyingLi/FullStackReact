// backend using commonJS module
// initial app setup
const express = require('express');
const mongoose = require('mongoose');

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser'); // a middleware
const passport = require('passport');
// cookieSession required to get access to cookie; passport required to tell passport to use cookie

const keys = require('./config/keys');
// db model files have to be required somewhere to get executed and recorded in db
require('./models/User'); // ** notice the order, this file defines the User model, and passport.js 
                            // has to come later to use that User model
require('./models/Survey');
require('./services/passport'); 
// b/c passport.js not returning everything, dont need assign to var, just want code executed



mongoose.connect(keys.mongoURI);

const app = express(); // by calling express like a function, generate a new express application
                        // e.g. the route handlers we write associated with this express app

// middleware wire with app.use()
// not all middlewares defined here, some that only get run with specific route handler will be passed into the handler as an argument and auto get run
app.use(bodyParser.json()); 
// for express, parse incoming POST req and attach parsed body to req.body obj
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
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// additional routing when in production env
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets like main.js or main.css file
    app.use(express.static('client/build')); // if after prev express server router doesn't find routes look for it in this specific folder

    // Express will serve up the index.html file if it doesnt recognize the route (if prev all not served the route)
    const path = require('path');
    
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // if some route dont understand just assume client side app and render index.html
    });
}

// # dynamic port binding
const PORT = process.env.PORT || 5000;
// Heroku specifies a port that incoming request can go thru b/c it has one server for many things
// When Heroku runs an app deployed onto it, it specifies env var that is the underlying env that node runs on top of
// these configurations given by Heroku right before app starts  

// env.PORT might only assigned by Heroku on production env, dev env (our machine) may not so use OR statement

app.listen(PORT);
// express tells NODE to listen on port # 

