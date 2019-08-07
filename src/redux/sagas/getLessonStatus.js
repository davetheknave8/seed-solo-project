import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getLessonStatus(){
    try{
        const response = yield axios.get('/api/tree/status')
        console.log(response.data);
        yield put({type: 'SET_LESSON_STATUS', payload: response.data})
    }
    catch(error){
        console.log('error getting lesson status')
    }
}

export default getLessonStatus;