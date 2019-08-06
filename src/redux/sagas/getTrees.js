import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getTrees(){
    try{
        const response = yield axios.get('/api/tree/tree');
        yield put({type: 'SET_TREES', payload: response.data});
    }
    catch(error){
        console.log('error getting trees', error);
    }
}   

export default getTrees;