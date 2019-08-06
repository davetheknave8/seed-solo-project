import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';

//From database
import getTrees from './getTrees.js';
import getLessons from './getLessons.js';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('FETCH_TREES', getTrees);
  yield takeEvery('FETCH_LESSONS', getLessons);
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
  ]);
}
