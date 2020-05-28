// host action creators
import axios from 'axios';
import {FETCH_USER} from './types';

// action creators (using redux-thunk and axios)
export const fetchUser = () => async dispatch=> {

    // if returned not an action but a function, redux-thunk will automatically dispatch the action
    // passed in arg is dispatch function
    
        const res = await axios.get('/api/current_user'); // **axios for ajax func
            // help w/ ajax request to call async our backend api w/o interferring behavior of existing page
            // relative path of backend application (again in dev go thru proxy in prod request directly go to backend)
        dispatch({type: FETCH_USER, payload: res.data});
};

// *syntax refactoring* : above equivalent to: if error function (with {} after =>) plus one return function expression, i.e. return function(dispatch) 
// then first => can directly point to function(dispatch) 
// this is also equivalent to remove function and first => point to another error function instead
// below shows the original before refactoring multiple

// export const fetchUser = () => {
//     return function(dispatch) {
//         axios
//             .get('/api/current_user')
//             .then(res => dispatch({type:FETCH_USER, payload: res}));
//     }
// }

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token); // call backend api, token will be parsed by body-parser module into req.body.id prop
    dispatch({type: FETCH_USER, payload: res.data});
    // assume get back same user model as before in fetchUser action (but backend post request handler upd db and user)
    // assume dispatch the same user model get back from the post request to update data state inside authReducer
};