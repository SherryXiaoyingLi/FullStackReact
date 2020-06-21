const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey); // when retrieve exported obj from the stripe module need pass in the secretKey
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    // ** can put in as many as middlewares as want, just require one of them has to actualy say res.send
    // will auto run the middleware not actually need to call
    app.post('/api/stripe', requireLogin, async (req, res)=>{

        // console.log(req.body);
        const charge = await stripe.charges.create({
            amount: 500, // specify amount a second time in backend to confirm amount match
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        // stripe charges complete here
        // charge -- get back a lot of more info about the charge
        
        // access user and upd user model
        req.user.credits += 5;
        // ** need call save to save in db, async op
        const user = await req.user.save();
        // save() may not necessarily upd req.user ref as well, try using user the most up-to-date ref for db model
        // send back user to browser
        res.send(user);

    }); // way to watch for a post request coming in
};