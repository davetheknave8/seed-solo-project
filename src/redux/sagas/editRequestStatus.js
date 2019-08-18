import { put } from 'redux-saga/effects';
import axios from 'axios';

function* editRequestStatus(action){
    try{
        yield axios.put(`/api/tree/status`, action.payload);
        yield put({type: 'FETCH_ALL_REQUESTS'})
    }
    catch(error){
        console.log('error editting request status');
    }
}

export default editRequestStatus;