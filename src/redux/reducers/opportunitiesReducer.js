import { combineReducers } from 'redux';

const opportunitiesReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_OPPORTUNITIES':
            return action.payload;
        default:
            return state;

    }
}

const opportunityVolunteerReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_OPPORTUNITY_VOLUNTEERS':
            return action.payload;
        default:
            return state;

    }
}
const certifiedVolunteers = (state = [], action)=> {
    switch (action.type) {
        case 'CERTIFIED_VOLUNTEERS':
            return action.payload;
        default:
            return state;

    }
}
export default combineReducers({
    opportunitiesReducer,
    opportunityVolunteerReducer,
    certifiedVolunteers
});