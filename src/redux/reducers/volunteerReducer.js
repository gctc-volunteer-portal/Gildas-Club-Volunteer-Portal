import { combineReducers } from 'redux';

// const volunteerReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'GET_VOLUNTEERS':
//             return action.payload;
//         default:
//             return state;

//     }
// }
const newVolunteers = (state = [], action) => {
    switch (action.type) {
        case 'NEW_VOLUNTEERS':
            return action.payload;
        default: 
            return state;
    }
}


export default combineReducers({
    // volunteerReducer,
    newVolunteers
});