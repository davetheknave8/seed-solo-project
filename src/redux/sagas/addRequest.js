import { put } from 'redux-saga/effects';
import axios from 'axios';

function* addRequest(action){
    try{
        yield axios.post('/api/tree/request', action.payload);
        yield put({type: 'FETCH_ALL_REQUESTS'})
    }
    catch(error){
        console.log('error adding request', error);
    }
}

export default addRequest;