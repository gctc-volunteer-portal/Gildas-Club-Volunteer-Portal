import { combineReducers } from 'redux';

const indVolunteerInfo = (state = {}, action) => {
    switch (action.type) {
        case 'VOLUNTEER_INFO':
            return action.payload
        case 'CLEAR':
            return {}
        default:
            return state;

    }
}


export default combineReducers({
   indVolunteerInfo
    // currentEventVolunteers
});