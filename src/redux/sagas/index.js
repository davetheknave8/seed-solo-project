import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';

//From database
import getTrees from './getTrees.js';
import getLessons from './getLessons.js';
import getLessonStatus from './getLessonStatus';
import getRecent from './getRecent';
import addRecent from './addRecent';
import getCurrent from './getCurrent';
import getCurrentLesson from './getCurrentLesson';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('FETCH_TREES', getTrees);
  yield takeEvery('FETCH_LESSONS', getLessons);
  yield takeEvery('FETCH_LESSON_STATUS', getLessonStatus);
  yield takeEvery('FETCH_RECENT_TREE', getRecent);
  yield takeEvery('ADD_RECENT', addRecent);
  yield takeEvery('FETCH_CURRENT_TREE', getCurrent);
  yield takeEvery('FETCH_CURRENT_LESSON', getCurrentLesson)
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
  ]);
}
