import { put } from 'redux-saga/effects';
import axios from 'axios';

function* addUserTree(action){
    try{
        yield axios.post('/api/tree/user_tree', action.payload);
        yield put({type: 'FETCH_TREES'})
    }
    catch(error){
        console.log('error adding user tree', error);
    }
}

export default addUserTree;