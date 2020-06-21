// SurveyForm shows a form for a user to add input
import _ from 'lodash'; 
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; 
// Field helps render any HTML element that's sent to collect user input
import SurveyField from './SurveyField';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

// <Field type = "text" name = "surveyTitle" component = "input" />
// Field name prop: tell reduxForm one piece of data being produced by our form called <name>, stored as key of the data
// Field component prop: "input" tells a simple html <input /> tag (type of html tag)
// together with Field type, indicating showing a <input /> and expecting input type "text"
// more advanced can replace html component w/ react component custom reduxForm component we write e.g. SurveyField
// also can include any custom prop directly in <Field /> e.g. label so SurveyField can directly receive and acts as a customization

// to enable submit of the input Field, wire it within a <form> and provide <button>
// handleSubmit func provided by reduxForm that we wired up with SurveyForm component

// use array and define formFields so when need modification only change one place
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields(){

        // generalizing above to create <Field /> w/ array and loadash map array 
        // remember deal w/ lst of compo has to have unique key, not w/ array but hardcode <Field /> four times then don't
        return _.map(formFields, ({label, name}) => {
            return (
            <Field key={name} component={SurveyField}  type="text" label ={label} name = {name}/>
            );
        });
    }

    // ***can't put this.props.onSurveySubmit() below b/c only want it executed onSubmit, not everytime JS renders
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type = "submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

// values Object contains all the things user entered, same as values gotten in <form />
function validate(values) {
    const errors = {};

    // if no title provided, add a title obj to errors
    // **the added error with field title will be auto attached by reduxForm (identifying its validate function)
    // and attach it to the <Field /> of reduxForm that contains a name field 'title'
    // if (!values.title) {
    //     errors.title = 'You must provide a title';
    // }

    // put this logic for emails check before the below one
    // so when first load and validate already auto ran (even though we used touched to not let this DISPLAY), values.emails undefined so use '', re test failed and error returned, will be overwritten by next error check that says no emails provided yet
    // also when entered somthing but invalid, first error show up, second error check passed (not that nothing entered), so also correct error msg display
    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name, noValueError }) => {
        // to figure out value of prop of values obj on runtime, the following syntax;
        // to get values.title (known prop title of values), then this way instead
        // same as for assigning errors obj a prop on the fly, use []
        if (! values[name]) {
            errors[name] = noValueError;
        }
    });

    return errors;
    // if reduxForm gets empty, fine
    // else reduxForm stops submission process
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);
// similar to connect reduxForm wires up with SurveyForm component so can manipulate component's props
// this reduxForm helper here takes one property specified in {}
// form will be an Obj inside state prop, containing a surveyForm Obj, which contains all the form data
// so if many form in app, and create a form with same name 'surveyForm', they will be sharing the same set of values, easy for step by step form
// destroyOnUnmount this way won't auto get rid of value when go back to SurveyForm from review (not go away when component unmounted automatically)
// but one problem: when click to add new survey again, previous data still there, also when user cancels/click other links to navigate away from form
// so wire up SurveyNew with reduxForm helper as well see explanation in SurveyNew.js