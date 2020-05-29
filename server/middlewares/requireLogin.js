// way to wrt a middleware (export a func), take three param, next is to let continue pass middleware to next middleware or actual request handler
module.exports = (req, res, next) => {
    // for every route handler that requires user logged in
    if (!req.user) { // recall fetch user -> current_user api is recalled everytime componentDidMount, set in index.js in server 
        return res.status(401).send({error:'You must log in!'}); // set http error code (401 Unauthorized) and err msg, 401 to 499 all represent http error code
    }
    next();
};