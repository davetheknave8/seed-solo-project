import { put } from 'redux-saga/effects';
import axios from 'axios';

function* completedObjective(action){
    try{
        yield axios.post('/api/tree/objective', action.payload);
        yield put({ type: 'FETCH_FINISHED_OBJECTIVES', payload: { user_id: action.payload.user_id, lesson_id: action.payload.lesson_id } })
    }
    catch(error){
        console.log('error adding completed objective', error);
    }
}

export default completedObjective;