import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getCreatorTrees(){
    try{
        const response = yield axios.get('/api/tree/creator_trees');
        yield put({type: 'SET_CREATOR_TREES', payload: response.data});
    }
    catch(error){
        console.log('error getting creator trees', error);
    }
}

export default getCreatorTrees;