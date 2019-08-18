import { put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteLesson(action) {
    try {
        yield axios.delete(`/api/tree/lesson/${action.payload.lessonId}`);
        yield put({ type: 'FETCH_CURRENT_TREE', payload: action.payload.treeId })
    }
    catch (error) {
        console.log('error deleting lesson status', error);
    }
}

export default deleteLesson;