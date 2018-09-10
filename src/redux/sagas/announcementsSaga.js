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

  function* announcementsSaga() {
    yield takeEvery('GET_ANNOUNCEMENTS_LIST', getAnnouncements)
  }
  





export default announcementsSaga;
