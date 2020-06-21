module.exports = (req, res, next) => {
    // for every route handler that requires user have minimum credits
    if (req.user.credits < 1) {  
        return res.status(403).send({error: 'Not enough credits!'}); // (403 Forbidden)
    }
    next();
};