// multiple lines within a form for user to enter diff info
// want some component that can be reused so create this component

// SurveyField contains logic to render a single label and text input

import React from 'react';

// since our custom field component has <input /> reduxForm auto pass some event handler functions in props.input
// this means when some events happen on our <input /> reduxForm auto intercepts that event and records for us

// pass all props of input to <input /> this way with {...input} w/o having to specify name by name

// label not from reduxForm but self defined previously for customization of label shows

// meta also from reduxForm, will include meta.error passed in validate function specified for reduxForm
// also contains meta.touched indicating whether user has 'touched' the <Field>, if not should not let error msg below auto-show
export default ({input, label, meta: {error, touched}}) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBlock:'5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    );
};