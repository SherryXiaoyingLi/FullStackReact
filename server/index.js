const express = require('express');
const app = express(); // by calling express like a function, generate a new express application
                        // e.g. the route handlers we write associated with this express app
app.get("/", (req, res)=>{
    res.send({hi: 'there'});
}); 
// app.get -> a new route handler 
// other 4 methods like get exist
// (req, res)=>{} is an error function that auto called when app receives a request with '/'

// # dynamic port binding
const PORT = process.env.PORT || 5000;
// Heroku specifies a port that incoming request can go thru b/c it has one server for many things
// When Heroku runs an app deployed onto it, it specifies env var that is the underlying env that node runs on top of
// these configurations given by Heroku right before app starts  

// env.PORT might only assigned by Heroku on production env, dev env (our machine) may not so use OR statement

app.listen(PORT);
// express tells NODE to listen on port # 