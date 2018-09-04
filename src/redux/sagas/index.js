import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import volunteerSaga from './volunteerSaga'


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    volunteerSaga(),
    // watchIncrementAsync()
  ]);
}
