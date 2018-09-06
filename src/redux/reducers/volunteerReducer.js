import { combineReducers } from 'redux';

const volunteerReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_VOLUNTEERS':
            return action.payload;
        default:
            return state;

    }
}


export default combineReducers({
    volunteerReducer,
    // currentEventVolunteers
});