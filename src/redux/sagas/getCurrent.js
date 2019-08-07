import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getCurrent(action){
    try{
        const response = yield axios.get(`/api/tree/current?id=${action.payload}`);
        yield put({type: 'SET_CURRENT_TREE', payload: response.data})
    }
    catch(error){
        console.log('error getting currentTree')
    }
}

export default getCurrent;