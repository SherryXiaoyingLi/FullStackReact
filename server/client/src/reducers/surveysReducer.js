import { FETCH_SURVEYS } from '../actions/types'; // recall types export more than one types, use { } here

// set default state to empty []
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        default:
            return state;
    }
}

