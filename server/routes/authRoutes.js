const passport = require('passport');

module.exports = (app) =>{

// app.get("/", (req, res)=>{
//     res.send({hi: 'there'});
// }); 
// app.get -> a new route handler 
// other 4 methods like get exist
// (req, res)=>{} is an error function that auto called when app receives a request with '/'

app.get("/auth/google", passport.authenticate('google', {scope: ['profile','email']}));
// a new route handler: (for the first step of oauth with passport) when receive user request '/auth/google'
// normally when receive request handle with an error function as above
// but now passport strategy handles for us, 'google' is a string tied to prev new GoogleStrategy, scope is what info app want to get about user from google

app.get("/auth/google/callback", passport.authenticate('google'))
// after receiving request with this url from google 
// notice handling code like before (passport.authenticate('google')), but in url actually also include the code sent back by google 
// so passport strategy will notice that and handle the request differetly

app.get('/api/logout', (req, res)=>{
    req.logout(); // function attached to req by passport automatically
    // it takes the cookie contained in it, and kill id associated with cookie
    res.send(req.user); // send back to user that they are successfully logged out, since usr has been deleted, should be empty here!
})

// test url
app.get("/api/current_user", (req, res)=>{
    res.send(req.user);
// by the time when passport has pulled user id out of cookie (whose data is extracted by cookie session) and deserialize user, done function called
// passport adds user model instance to req as req.user, so this router now can handle by updaing a res now
});

};
// export a function w/ an argument

