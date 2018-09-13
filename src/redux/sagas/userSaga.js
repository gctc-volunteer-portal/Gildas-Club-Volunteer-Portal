import { put, takeLatest, call } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';
import { callUser } from '../requests/userRequests';
import axios from 'axios';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    yield put({ type: USER_ACTIONS.REQUEST_START });
    const user = yield callUser();
    yield put({
      type: USER_ACTIONS.SET_USER,
      user,
    });
    yield put({
      type: USER_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: USER_ACTIONS.REQUEST_DONE,
    });
    yield put({
      type: USER_ACTIONS.USER_FETCH_FAILED,
      message: error.data || "FORBIDDEN",
    });
  }
}

function* updatePassword (action) {
  try {
    yield call(axios.put, '/api/password/reset-pass', action.payload)
  } catch (error) {
    console.log(error)
  }
}

function* requestPasswordReset(action) {
  try {
    yield call(axios.put, '/api/password/forgot-pass', action.payload)
  } catch (error) {
    console.log(error)
  }
}

/*
  Starts fetchUser on each dispatched `FETCH_USER` action.
  Allows concurrent fetches of user.
*/
// function* userSaga() {
//   yield takeEvery('FETCH_USER', fetchUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "FETCH_USER" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* userSaga() {
  yield takeLatest(USER_ACTIONS.FETCH_USER, fetchUser);
  yield takeLatest('UPDATE_PASSWORD', updatePassword);
  yield takeLatest('REQUEST_RESET', requestPasswordReset);
}

export default userSaga;
