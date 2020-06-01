import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import {withRouter} from 'react-router-dom';

// formValues passed in mapStateToProps
// submitSurvey passed in actions
// history passed in withRouter 
const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
    const reviewFields = _.map(formFields, ({name, label}) =>{
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    // if below onClick w/o error function, and submitSurvey(..) rather than just submitSurvey
    // will get auto called everytime JS renders, so instead use error function () => (b/c needs param included)
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
                Back
            </button>
            <button onClick={()=>submitSurvey(formValues, history)} className="green btn-flat white-text right">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
            
        </div>
    )
};

// transform redux state to some props to send down to component
// state.form.surveyForm.values
function mapStateToProps(state){
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
// withRouter a react-dom-router helper to teach some component that doesnt know about React-router about it, 
// so history obj provided by react-router is passed into component props and can use routed link in action creator submitSurvey when pass history to the action creator above