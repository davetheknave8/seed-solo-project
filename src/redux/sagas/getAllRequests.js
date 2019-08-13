import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getAllRequests(){
    try{
        const response = yield axios.get('/api/tree/request');
        yield put({type: 'SET_REQUESTS', payload: response.data});
    }
    catch(error){
        console.log('error getting all requests', error);
    }
}

export default getAllRequests;