import { put } from 'redux-saga/effects';
import axios from 'axios';

function* addRecent(action){
    try{
        yield axios.post('/api/tree/recent', action.payload);
        yield put({type: 'FETCH_RECENT_TREE'});
    }
    catch(error){
        console.log('error adding recent tree');
    }
}

export default addRecent;