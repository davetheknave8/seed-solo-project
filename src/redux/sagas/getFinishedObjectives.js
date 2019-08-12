import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getFinishedObjectives(action){
    try{
        const response = yield axios.get(`/api/tree/objective/finished?lesson_id=${action.payload.lesson_id}&user_id=${action.payload.user_id}`)
        yield put({type: 'SET_FINISHED_OBJECTIVES', payload: response.data})
    }
    catch(error){
        console.log('error getting finished objectives', error);
    }
}

export default getFinishedObjectives;