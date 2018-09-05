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

function* opportunitiesSaga(){
    yield takeEvery('GET_EVENTS', getEvents)
    yield takeEvery('GET_EVENT_VOLUNTEERS', getEventVolunteers)


}

export default opportunitiesSaga;