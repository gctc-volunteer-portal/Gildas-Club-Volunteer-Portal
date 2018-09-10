import { put as dispatch, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

function* getEvents() {
    try {
        const opportunitiesList = yield call(axios.get, '/api/opportunities')
        yield dispatch({
            type: 'GET_OPPORTUNITIES',
            payload: opportunitiesList.data
        })
    } catch (err) {
        yield console.log(err);
    }
}

function* getEventVolunteers(action) {
    try {
        const opportunityVolunteerList = yield call(axios.get, `/api/opportunities/${action.payload}`)
        yield dispatch({
            type: 'GET_OPPORTUNITY_VOLUNTEERS',
            payload: opportunityVolunteerList.data
        })
    } catch (err) {
        yield console.log(err);
    }
}

function* fetchSingleVolunteerOpportunities(action) {
    try {
        const singleVolunteerOpportunities = yield call(axios.get, `/api/opportunities/volunteer`);
        yield dispatch({
            type: 'SET_SINGLE_VOLUNTEER_OPPORTUNITIES',
            payload: singleVolunteerOpportunities.data
        })
    } catch (error) {
        yield console.log(error);
    }
}

function* deleteItem(action) {
    try {
        console.log(action.payload)
        let returnedOpportunity = yield call(axios.delete, `/api/opportunities/${action.payload.opportunityId}`, { data: { volunteerId: action.payload.volunteerId } });
        yield dispatch({
            type: 'GET_EVENT_VOLUNTEERS',
            payload: returnedOpportunity.data[0].opportunity_id
        })
    } catch (err) {
        yield console.log(err);
    }
}

function* enrollVolunteer(action) {
    try {
        yield call(axios.post, `/api/opportunities/add_volunteer`, action.payload);

        yield dispatch({
            type: 'GET_EVENT_VOLUNTEERS',
            payload: action.payload.opportunityId
        })
    } catch (err) {
        yield console.log(err);

    }
}
//Dispatch POST request with new opportunity data
function* addOpportunity(action) {
    try {
        yield call(axios.post, `/api/opportunities`, action.payload);
        yield dispatch({
            type: 'GET_EVENTS'
        })
    } catch (err) {
        yield console.log(err);
    }
}
function* getCertifiedVolunteers(certificationId) {
    try {
        const certifiedVolunteers = yield call(axios.get, '/api/autocomplete', {
            params: {
                certificationId: certificationId
            }
        })
        yield dispatch({
            type: 'CERTIFIED_VOLUNTEERS',
            payload: certifiedVolunteers.data
        })
    } catch (err) {
        yield console.log(err);
    }

}

function* checkEnrolled(action){
    try {
        let enrolledStatus = false;
        console.log(action.payload)
        const enrollment = yield call(axios.get, `/api/opportunities/enrolled/${action.payload.opportunityId}`);
        if(enrollment.data.length > 0) {
            enrolledStatus = true;
        }
        yield dispatch({
            type: 'SET_ENROLLMENT',
            payload: enrolledStatus
        })
    } catch (error) {
              yield console.log(err);
    }
}
        
function* updateOpportunity(action) {
    try {
        yield call(axios.put, `/api/opportunities/${action.payload.opportunityId}`, action.payload.updateOpportunityData)
        yield dispatch({
            type: 'GET_EVENTS'
        })
    } catch (err) {
        yield console.log(err);
    }
}



function* opportunitiesSaga() {
    yield takeEvery('GET_EVENTS', getEvents);
    yield takeEvery('GET_EVENT_VOLUNTEERS', getEventVolunteers);
    yield takeEvery('ADD_OPPORTUNITY', addOpportunity);
    yield takeEvery('DELETE_ITEM', deleteItem);
    yield takeEvery('ENROLL_VOLUNTEER', enrollVolunteer);
    yield takeEvery('FETCH_SINGLE_VOLUNTEER_OPPORTUNITIES', fetchSingleVolunteerOpportunities);
    yield takeEvery('GET_CERTIFIED_VOLUNTEERS', getCertifiedVolunteers);
    yield takeEvery('CHECK_ENROLLED', checkEnrolled);
    yield takeEvery('UPDATE_OPPORTUNITY', updateOpportunity);
}

export default opportunitiesSaga;