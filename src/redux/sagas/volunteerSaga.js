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

function* getIndVolunteerInfo(action){
    console.log(action.payload);
    let id = action.payload
    try{
        yield dispatch({
            type:'CLEAR'  
            });
        const individualVolunteerInfo = yield call(axios.get, `/api/volunteers/indVolunteer/${id}`)
        yield dispatch({
            type:'VOLUNTEER_INFO',
            payload: individualVolunteerInfo.data[0]
        })
    }catch(err){
        console.log(err);
        
    }
}

function* fetchVolunteerInfo() {
    try {
        const volunteerInfo = yield call(axios.get, '/api/volunteers/info')
        yield dispatch({
            type: 'SET_VOLUNTEER_INFO',
            payload: volunteerInfo.data
        })
    } catch (error) {
        yield console.log(error);
    }
}


 function* getMyVolunteerEvents(){
         try{
        const myAvailableEvents = yield call(axios.get, '/api/volunteers/my_available_events')
        console.log(myAvailableEvents);
    
        yield dispatch({
            type: 'MY_AVAILABLE_EVENTS',
            payload: myAvailableEvents.data
        })
    } catch  (err) {
        yield console.log(err);
      }

 }
function* updateVolunteers(action){
    console.log(action.payload);
        try{
            const update = yield call(axios.put, `/api/volunteers/updateInfo/`, action.payload)

        }catch(err){
            console.log(err);
            
        }
}


function* volunteerSaga(){
    yield takeEvery('GET_USERS', getUsers)

    yield takeEvery('UPDATE_VOLUNTEER_INFO', UpdateVolunteers)
    yield takeEvery('FETCH_VOLUNTEER_INFO', fetchVolunteerInfo)
    yield takeEvery('GET_ALL_VOLUNTEER_INFO', getIndVolunteerInfo) 
}





export default volunteerSaga;