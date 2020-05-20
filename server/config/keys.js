// keys.js - figure out what set of credentials to return (figure out dev or prod env)

// heroku sets up NODE_ENV env var automatically (like process.env.PORT) that tells if its prod or dev env
// if running app on local laptop will always go to dev env
if (process.env.NODE_ENV === 'production') {
    // we are in production - return the prod set of keys
    module.exports = require('./prod');
    // require './prod.js' and immediately assign it to module.exports
}
else {
    // we are in development - return the dev keys
    module.exports = require('./dev');
}

