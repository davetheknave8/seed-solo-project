import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getRecent(){
    try{
        const response = yield axios.get(`/api/tree/recent`);
        yield put({type: 'SET_RECENT_TREE', payload: response.data})
    }
    catch(error){
        console.log('error getting recent tree', error);
    }
}

export default getRecent;