import { put as dispatch, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios'


function* getEvents(){
    try{
        const opportunitiesList = yield call(axios.get, '/api/opportunities')
        yield dispatch({
            type: 'GET_OPPORTUNITIES',
            payload: opportunitiesList.data
        })
    } catch  (err) {
        yield console.log(err);
      }

}

function* getEventVolunteers(action){
    try{
        const opportunityVolunteerList = yield call(axios.get, `/api/opportunities/${action.payload}`)
        yield dispatch({
            type: 'GET_OPPORTUNITY_VOLUNTEERS',
            payload: opportunityVolunteerList.data
        })
    } catch  (err) {
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
console.log(action.payload)
    try {
      let returnedOpportunity = yield call(axios.delete, `/api/opportunities/${action.payload.opportunityId}`, {data: {volunteerId: action.payload.volunteerId}})
      ;
      console.log('Deleted opportunity id:', returnedOpportunity.data[0]);
      
      yield dispatch({
          type: 'GET_EVENT_VOLUNTEERS',
          payload: returnedOpportunity.data[0].opportunity_id
      })
    } catch (err) {
      yield console.log(err);
  
    }
}

  function* enrollVolunteer(action){
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

function* addOpportunity(newOpportunity){
    try{
        yield call(axios.post, `/api/opportunities/, ${newOpportunity}`)
    } catch  (err) {
        yield console.log(err);
      }

}

function* opportunitiesSaga(){
    yield takeEvery('GET_EVENTS', getEvents)
    yield takeEvery('GET_EVENT_VOLUNTEERS', getEventVolunteers)
    yield takeEvery('ADD_OPPORTUNITY', addOpportunity)
    yield takeEvery('DELETE_ITEM', deleteItem)
    yield takeEvery('ENROLL_VOLUNTEER', enrollVolunteer),
    yield takeEvery('FETCH_SINGLE_VOLUNTEER_OPPORTUNITIES', fetchSingleVolunteerOpportunities)
}

export default opportunitiesSaga;