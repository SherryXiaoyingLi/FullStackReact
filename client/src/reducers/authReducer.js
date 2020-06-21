import {FETCH_USER} from '../actions/types';

export default function(state = null, action) {
    // console.log(action); console log every time authReducer called (action dispatched to here)
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
            // if logged in, payload is the user object 
            // if not, payload is an empty string (returned by api (in the api, the req.user obj attached to req by passport))
            // '' is false in js, i.e. false || false will return false
        default:
            // if /api/current_user still getting the user data 
            return state;
    }
}
// export a function with two arg objects, state and action
// so redux-store up to here is aware of state change