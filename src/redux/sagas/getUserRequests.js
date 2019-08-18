import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getUserRequests(){
    try{
        const response = yield axios.get('/api/tree/user_requests');
        yield put({type: 'SET_USER_REQUESTS', payload: response.data});
        yield put({type: 'FETCH_USER'})
    }   
    catch(error){
        console.log('error getting userRequests', error);
    }
}

export default getUserRequests;