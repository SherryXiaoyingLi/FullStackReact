const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url'); // integrated module in Node, not self installed, function help parse url 
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');


module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res)=>{
        const surveys = await Survey.find({ _user: req.user.id }) // do not want to pull all survey info with all long list of recipients
            .select({ recipients: false }); // to only pull out specific fields

        res.send(surveys);
    });

    // when put url this way express will auto try matching w/ incoming request
    app.get('/api/surveys/:surveyId/:choice', (req, res) => { 
        res.send('Thanks for voting!');
    });

    // when ngrok local server sends POST request to our backend
    // we also respend w/ empty resp, (nice for sendgrid) so close off the request and not leave sendgrid idling and resending POST request
    app.post('/api/surveys/webhooks', (req, res)=>{
        const p = new Path('/api/surveys/:surveyId/:choice'); // Path here helps extract surveyId and choice by defining an obj p this way for testing pathname
        
        // _.chain(arr) 
        //  .sort()     with _.chain(arr) can call a series of lodash function w/o assigning to temp var
        //  .map(...)
        //  .value()  when done call .value() to get the real underlying changed arr
        _.chain(req.body)
            .map(({email, url})=>{
            
                // URL here helps extract pathname
                const match = p.test(new URL(url).pathname); // rp.test returns null if can't extract both surveyId and choice
                if (match) {
                    return {email, surveyId: match.surveyId, choice: match.choice};
                } // so only if match not null will return the info, else won't return any so inside arr produced by map will be an element undefined
            })
            // compact func of lodash take away all undefined element in array
            .compact()
            .uniqBy('email', 'surveyId')
            .each( ({ surveyId, email, choice }) => { 
                // second obj is about how to update the found first obj
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false} // $eleMatch go thru all the sub doc elements (all recipient elements) and find exactly one survey that matches the criteria 
                    }
                }, {
                    $inc: { [choice]: 1 }, // $inc mongo operator (increment), [choice] is replaced with value of choice, either yes or no, at run time
                    $set: { 'recipients.$.responded': true }, // $set recipients sub doc collection's $eleMatch (the $) 's responded to true
                    lastResponded: new Date() // ??? 
                }).exec(); // really execute the query 
                // in fact also an async function but we here don't have to wait until everything alldone, so no need to do async handling
                
            })
            .value();
        
        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res)=>{
        const {title, subject, body, recipients} = req.body;

        // create instance of mongodb Survey class
        const survey = new Survey({
            title,
            subject,
            body,
            // recipients: recipients.split('.').map(email => {return {email:email.trim() }}) // map arry of email string from frontend to array of {email: the email string}
            // the responded prop in recipients sub document collection will be defaulted in db to false when we create new Survey so {email} as a new Recipient is fine
            // the trim() function b/c the comma separated string can have spaces too
            recipients: recipients.split(',').map(email => ({email : email.trim() })), // parenthesis around {email} for mking clear to js interpreter that it's an obj not a func
            _user: req.user.id,
            dateSent: Date.now()
            // dateLastResponded not recorded upon creation of Survey
        });
        // place to send an email
        // create new instance of Mailer class component
        // take data needed and view (html) of email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        
        // since there async a lot can go wrong here
        // add a catch for checking
        try {
        await mailer.send();
        await survey.save(); // save survey to db after success sent to recipients
        req.user.credits -= 1; // deduct 1 credit from sender and upd user model
        const user = await req.user.save();

        res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};