import { put as dispatch, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios'

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

<<<<<<< HEAD
function* getEventVolunteers(action){
    try{
=======
function* getEventVolunteers(action) {
    try {
>>>>>>> master
        const opportunityVolunteerList = yield call(axios.get, `/api/opportunities/${action.payload}`)
        yield dispatch({
            type: 'GET_OPPORTUNITY_VOLUNTEERS',
            payload: opportunityVolunteerList.data
        })
    } catch (err) {
        yield console.log(err);
    }
}

<<<<<<< HEAD
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

=======
>>>>>>> master
function* deleteItem(action) {
    try {
        let returnedOpportunity = yield call(axios.delete, `/api/opportunities/${action.payload.opportunityId}`, { data: { volunteerId: action.payload.volunteerId } });
        yield dispatch({
            type: 'GET_EVENT_VOLUNTEERS',
            payload: returnedOpportunity.data[0].opportunity_id
        })
    } catch (err) {
        yield console.log(err);
    }
}

<<<<<<< HEAD
  function* enrollVolunteer(action){
=======
function* enrollVolunteer(action) {
>>>>>>> master
    try {
        yield call(axios.post, `/api/opportunities`, action.payload);
        yield dispatch({
            type: 'GET_EVENT_VOLUNTEERS',
            payload: action.payload.opportunityId
        })
    } catch (err) {
        yield console.log(err);

    }
}

function* addOpportunity(action) {
    try {
        yield call(axios.post, `/api/opportunities`, action.payload)
    } catch (err) {
        yield console.log(err);
    }
}

<<<<<<< HEAD
function* opportunitiesSaga(){
=======
function* opportunitiesSaga() {
>>>>>>> master
    yield takeEvery('GET_EVENTS', getEvents)
    yield takeEvery('GET_EVENT_VOLUNTEERS', getEventVolunteers)
    yield takeEvery('ADD_OPPORTUNITY', addOpportunity)
    yield takeEvery('DELETE_ITEM', deleteItem)
<<<<<<< HEAD
    yield takeEvery('ENROLL_VOLUNTEER', enrollVolunteer),
    yield takeEvery('FETCH_SINGLE_VOLUNTEER_OPPORTUNITIES', fetchSingleVolunteerOpportunities)
=======
    yield takeEvery('ENROLL_VOLUNTEER', enrollVolunteer)
>>>>>>> master
}

export default opportunitiesSaga;