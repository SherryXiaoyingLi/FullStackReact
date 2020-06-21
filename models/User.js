// how to import/use mongoose models/ mongodb collections
// do not export mongoose models b/c during test may sometimes load in model multiple times, and will get confuse
// instead, just have this code run in index.js, then require('mongoose') in passport.js and run the mongoose function to fetch model

const mongoose = require('mongoose');
const Schema = mongoose.Schema; // or const { Schema } = mongoose

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 } // pass an obj this way to tell type of Number and default 0
});

mongoose.model('users', userSchema);
// let mongoose create a new schema called 'users' if doesnt exist
