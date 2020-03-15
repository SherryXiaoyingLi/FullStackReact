const express = require('express');
const app = express(); // by calling express like a function, generate a new express application
                        // e.g. the route handlers we write associated with this express app
app.get("/", (req, res)=>{
    res.send({hi: 'there'});
});
app.listen(5000);