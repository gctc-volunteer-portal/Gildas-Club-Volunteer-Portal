import { put as dispatch, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios'


function* getUsers(){
    try{
        const volunteerList = yield call(axios.get, '/api/volunteers')
        yield dispatch({
            type: 'GET_VOLUNTEERS',
            payload: volunteerList.data
        })
    } catch  (err) {
        yield console.log(err);
      }

}
function* getEventCurrentVolunteers(){
    try{
        const currentVolunteerList = yield call(axios.get, '/api/volunteers')
        yield dispatch({
            type: 'CURRENT_EVENT_VOLUNTEERS',
            payload: currentVolunteerList.data
        })
    } catch  (err) {
        yield console.log(err);
      }

}
function* volunteerSaga(){
    yield takeEvery('GET_USERS', getUsers)
    yield takeEvery('GET_CURRENT_EVENT_VOLUNTEERS', getEventCurrentVolunteers )

}

export default volunteerSaga;