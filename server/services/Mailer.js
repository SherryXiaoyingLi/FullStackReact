const sendgrid = require('sendgrid');
const helper = sendgrid.mail; // if want to call mail can also do const {mail} = sendgrid
const keys = require('../config/keys');

// extending Mail class provided by sendgrid.mail library to do custom component
// get free sendgrid functions
class Mailer extends helper.Mail {
    // for ES2015 module, consturctor called automatically when using new keyword to create instance
    // 1st arg doesnt have to be Survey but some obj with subject and recipients field
    // 2nd arg the html view
    constructor( {subject, recipients}, content ){
        super();

        this.sgApi = sendgrid(keys.sendGridKey); // need api key to send Mailer obj
        this.from_email = new helper.Email('xl2gs@virginia.edu'); // a sendgrid verified email
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients); // create an array of helper.Email objects
    
        // add the html content to email 
        // not need self define inherit from super() Mail base class, sendgrid expects you to call this
        this.addContent(this.body);
        // add click tracking that sendgrid is gonna replace link in email with address to their own server
        // need self define function but code within is provided by sendgrid and how sendgrid expects to configure tracking
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        // for every {email} recipient obj (in fact also contain responded prop) pull out that email into a new array
        return recipients.map(({email})=>{
            return new helper.Email(email); // like above helper.Email(email) helps format email and lets sendgrid understand
        })
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        // not need self define inherit from super() sendgrid expects you to call this
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients(){
        const personalize = new helper.Personalization();
        // add each helper.Email obj to hepler.personalization obj
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        // not need self define inherit from super() sendgrid expects you to call this
        this.addPersonalization(personalize);
    }
    async send(){
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON() // again toJSON() defined by Mail base class
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;