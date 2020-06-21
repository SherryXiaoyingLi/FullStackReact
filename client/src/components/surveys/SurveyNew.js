// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    // component level state (way to write):

    // constructor(props) {
    //     super(props);

    //     this.state = { new : true};
    // }

    // simpler way, equivalent:
    state = {showFormReview: false};

    // ***notice although <SurveyForm> imported, when instantiate below onSurveySubmit defined 
    // and passed as a new prop of SurveyForm here, so in SurveyForm.js can access that functional prop to be called on form submit
    renderContent() {
        if (this.state.showFormReview ) {
            return <SurveyFormReview onCancel={()=>this.setState({showFormReview: false})}/>;
        }
        return <SurveyForm onSurveySubmit={()=>this.setState({showFormReview: true})}/>;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form:'surveyForm'
})(SurveyNew);

// no set destroyOnUnmount here to false so when this component unmounted data on form will clear away
// but set on SurveyForm component's so ehrn SurveyForm unmounted to review data still there and also when review calls go back
// but when click to anywhere to go outside of SurveyNew (unmount) then data clears 
// so need wiring up of SurveyNew w/ reduxForm helper as well