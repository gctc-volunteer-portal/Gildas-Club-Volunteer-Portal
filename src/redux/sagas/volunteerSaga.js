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

function* UpdateVolunteers(action){
    console.log(action.payload);
        // try{
        //     const update = yield call(axios.put, `/api/volunteers/updateInfo/`, action.payload)
        //     // yield dispatch({

        //     // })
        // }catch(err){
        //     console.log(err);
            
        // }
}


function* volunteerSaga(){
    yield takeEvery('GET_USERS', getUsers)
    yield takeEvery('UPDATE_VOLUNTEER_INFO', UpdateVolunteers)
}





export default volunteerSaga;