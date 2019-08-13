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
import getSearch from './getSearch';
import addUserTree from './addUserTree';
import getCurrentObjectives from './getCurrentObjectives';
import getFinishedObjectives from './getFinishedObjectives';
import addCompletedObjective from './addCompletedObjective';
import deleteCompletedObjective from './deleteCompleteObjective';
import addCompletedLesson from './addCompletedLesson';
import deleteUserTree from './deleteUserTree';
import deleteLessonStatus from './deleteLessonStatus';
import getAllTrees from './getAllTrees';
import getAllUserTrees from './getAllUserTrees';
import getAllRequests from './getAllRequests';
import addRequest from './addRequest';

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
  yield takeEvery('FETCH_CURRENT_LESSON', getCurrentLesson);
  yield takeEvery('FETCH_SEARCH', getSearch);
  yield takeEvery('ADD_USER_TREE', addUserTree);
  yield takeEvery('FETCH_CURRENT_OBJECTIVES', getCurrentObjectives);
  yield takeEvery('FETCH_FINISHED_OBJECTIVES', getFinishedObjectives);
  yield takeEvery('ADD_COMPLETED_OBJECTIVE', addCompletedObjective);
  yield takeEvery('DELETE_COMPLETED_OBJECTIVE', deleteCompletedObjective);
  yield takeEvery('ADD_COMPLETED_LESSON', addCompletedLesson);
  yield takeEvery('REMOVE_USER_TREE', deleteUserTree);
  yield takeEvery('RESET_LESSON_STATUS', deleteLessonStatus);
  yield takeEvery('FETCH_ALL_TREES', getAllTrees);
  yield takeEvery('FETCH_ALL_USER_TREES', getAllUserTrees);
  yield takeEvery('FETCH_ALL_REQUESTS', getAllRequests);
  yield takeEvery('ADD_REQUEST', addRequest);
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
  ]);
}
