import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import volunteerSaga from './volunteerSaga';
import opportunitiesSaga from './opportunitiesSaga';
import certificationsSaga from './certificationsSaga';
import announcementsSaga from './announcementsSaga'


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    volunteerSaga(),
    opportunitiesSaga(),
    certificationsSaga(),
    announcementsSaga()
  ]);
}
