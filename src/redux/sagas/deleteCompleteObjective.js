import { put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteCompleteObjective(action){
    try{
        yield axios.delete(`/api/tree/objective?user_id=${action.payload.user_id}&objective_id=${action.payload.objective_id}&lesson_id=${action.payload.lesson_id}`);
        yield put({ type: 'FETCH_FINISHED_OBJECTIVES', payload: { user_id: action.payload.user_id, lesson_id: action.payload.lesson_id } });
    }
    catch(error){
        console.log('error deleting complete objective', error);
    }
}

export default deleteCompleteObjective;