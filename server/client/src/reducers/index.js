import {combineReducers} from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer
});
// combineReducers, in tradition, defined with key value pair of sub reducers