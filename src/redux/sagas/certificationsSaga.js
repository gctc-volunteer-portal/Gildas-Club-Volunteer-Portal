import { put as dispatch, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

function* getCertificates() {
  try {
    const certificationsList = yield call(axios.get, '/api/certifications')
    yield dispatch({
      type: 'GET_CERTIFICATIONS',
      payload: certificationsList.data
    })
  } catch (err) {
    yield console.log(err);
  }
}

function* certificationsSaga() {
  yield takeEvery('GET_CERTIFICATIONS_LIST', getCertificates)
}

export default certificationsSaga;