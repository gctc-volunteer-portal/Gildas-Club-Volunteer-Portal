import { put as dispatch, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

function* getAnnouncements() {
    try {
      let announcementsList = yield call(axios.get,'/api/announcements')
      yield dispatch({
        type: 'GET_ANNOUNCEMENTS',
        payload: announcementsList.data
      })
    } catch (err) {
      yield console.log(err);
    }
  }
  function* createAnnouncement(action) {
    try {
      yield call(axios.post, '/api/announcements', action.payload)
      yield dispatch({
          type: 'GET_ANNOUNCEMENTS_LIST'
      })
    } catch (err) {
      yield console.log(err);
    }
  }
  function* deleteAnnouncement(action) {

    try {
      yield call(axios.delete, `/api/announcements/${action.payload}`);
      yield dispatch({
        type: 'GET_ANNOUNCEMENTS_LIST'
  
      })
    } catch (err) {
      yield console.log(err);
    }
  }
  

  function* announcementsSaga() {
    yield takeEvery('GET_ANNOUNCEMENTS_LIST', getAnnouncements)
    yield takeEvery('ADD_ANNOUNCEMENT', createAnnouncement)
    yield takeEvery('DELETE_ANNOUNCEMENT', deleteAnnouncement)
  }
  





export default announcementsSaga;
