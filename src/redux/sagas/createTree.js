import { put } from 'redux-saga/effects';
import axios from 'axios';

function* createTree(action){
    try{
        yield axios.post('/api/tree/tree', action.payload);
        yield put({type: 'FETCH_CREATOR_TREES'})
    }
    catch(error){
        console.log('error creating tree', error);
    }
}

export default createTree;