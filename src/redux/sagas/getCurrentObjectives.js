import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getCurrentObjectives(action){
    try{
        const response = yield axios.get(`/api/tree/objective?lesson_id=${action.payload}`)
        yield put({type: 'SET_OBJECTIVES', payload: response.data})

    }
    catch(error){
        console.log('error getting current objectives', error);
    }
}

export default getCurrentObjectives;