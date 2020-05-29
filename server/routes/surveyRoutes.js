const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');


module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
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