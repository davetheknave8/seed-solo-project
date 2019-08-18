import { put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteTree(action){
    try{
        yield axios.delete(`/api/tree/delete_tree/${action.payload}`);
        yield put({ type: 'FETCH_CREATOR_TREES'});
        yield put({type: 'FETCH_ALL_TREES'})
    }
    catch(error){
        console.log('error deleting tree', error);
    }
}

export default deleteTree;