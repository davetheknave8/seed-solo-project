import { put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteLessonStatus(action){
    try{
        yield axios.delete(`/api/tree/lesson_status?lesson_id=${action.payload.lesson_id}`);
        yield put({type: 'FETCH_LESSON_STATUS'});
        yield put({type: 'FETCH_FINISHED_OBJECTIVES', payload: action.payload})
    }
    catch(error){
        console.log('error deleting lesson status', error);
    }
}

export default deleteLessonStatus;