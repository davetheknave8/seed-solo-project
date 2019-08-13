import { put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteUserTree(action){
    try{
        yield axios.delete(`/api/tree/user_tree?tree_id=${action.payload.tree_id}`);
        yield put({type: 'FETCH_TREES'});
    }
    catch(error){
        console.log('error deleting user tree');
    }
}

export default deleteUserTree;