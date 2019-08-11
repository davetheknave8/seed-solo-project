import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getSearch(action){
    try{
        const response = yield axios.get(`/api/tree/search?query=${action.payload}`);
        yield put({type: 'SET_SEARCH', payload: response.data})
    }
    catch(error){
        console.log('error in getSearch saga', error);
    }
}

export default getSearch;