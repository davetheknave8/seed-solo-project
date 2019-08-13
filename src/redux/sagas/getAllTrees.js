import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getAllTrees(){
    try{
        const response = yield axios.get('/api/tree/all');
        yield put({type: 'SET_ALL_TREES', payload: response.data});
    }
    catch(error){
        console.log('error getting all trees', error);
    }
}

export default getAllTrees;