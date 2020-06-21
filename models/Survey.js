const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], // way to create a sub document collection
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // way to create a relationship field, type object id, ref User, i.e. every Survey belongs to a User who created
    dateSent: Date,
    lastResponded: Date // more info about a Survey
});

mongoose.model('surveys', surveySchema);