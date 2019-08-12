import { put } from 'redux-saga/effects';
import axios from 'axios';

function* addCompletedLesson(action){
    try{
        yield axios.post('/api/tree/complete_lesson', action.payload);
        yield put({type: 'FETCH_LESSON_STATUS'})
    }
    catch(error){
        console.log('error adding completed lesson', error);
    }
}

export default addCompletedLesson;