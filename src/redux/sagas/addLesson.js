import { put } from 'redux-saga/effects';
import axios from 'axios';

function* addLesson(action){
    try{
        yield axios.post('/api/tree/lesson', action.payload);
        yield put({type: 'FETCH_CURRENT_TREE', payload: action.payload.treeId})
    }
    catch(error){
        console.log('error adding lesson', error);
    }
}

export default addLesson;