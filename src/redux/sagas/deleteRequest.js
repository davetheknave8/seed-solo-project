import { put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteRequest(action){
    try{
        yield axios.delete(`/api/tree/request/${action.payload}`);
        yield put({type: 'FETCH_USER_REQUESTS'});
        yield put({ type: 'FETCH_ALL_REQUESTS'})
    }
    catch(error){
        console.log('error deleting request', error);
    }
}

export default deleteRequest;