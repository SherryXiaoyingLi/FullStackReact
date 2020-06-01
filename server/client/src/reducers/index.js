import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form'; // make redux-from imported reducer clear by renaming
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});
// combineReducers, in tradition, defined with key value pair of sub reducers
// place that holds all our reducers, not just ones self written, but also those imported