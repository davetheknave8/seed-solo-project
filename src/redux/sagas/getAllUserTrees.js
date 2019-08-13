import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getAllUserTrees(){
    try{
        const response = yield axios.get('/api/tree/all_user_tree');
        yield put({type: 'SET_ALL_USER_TREES', payload: response.data});
    }
    catch(error){
        console.log('error getting all user trees');
    }
}

export default getAllUserTrees;