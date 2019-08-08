import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getCurrentLesson(action){
    try{
        const response = yield axios.get(`/api/tree/current_lesson?id=${action.payload}`)
        yield put({type: 'SET_CURRENT_LESSON', payload: response.data})
    }
    catch(error){
        console.log('error getting current lesson', error);
    }
}

export default getCurrentLesson;