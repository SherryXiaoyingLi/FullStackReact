// prod.js - production keys here

module.exports = {

    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    // by convention heroku env var named like this (all capital letters separated by underscore)
    // this is also how to be setup on heroku, manually defined and stored
}
