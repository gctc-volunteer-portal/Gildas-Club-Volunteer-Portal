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
function* volunteerSaga(){
    yield takeEvery('GET_EVENTS', getEvents)

}

export default volunteerSaga;