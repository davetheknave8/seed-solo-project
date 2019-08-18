import { put } from 'redux-saga/effects';
import axios from 'axios';

function* editRequest(action){
    try{
        yield axios.put(`/api/tree/request/${action.payload.id}`, action.payload);
        yield put({type: 'FETCH_USER_REQUESTS'})
    }
    catch(error){
        console.log('error editing request', error);
    }
}

export default editRequest;