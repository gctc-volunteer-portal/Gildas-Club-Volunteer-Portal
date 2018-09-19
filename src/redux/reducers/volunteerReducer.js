import { combineReducers } from 'redux';

const newVolunteers = (state = [], action) => {
    switch (action.type) {
        case 'NEW_VOLUNTEERS':
            return action.payload;
        default: 
            return state;
    }
}


export default combineReducers({
    newVolunteers
});