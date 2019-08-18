import { put } from 'redux-saga/effects';
import axios from 'axios';

function* addSubcategory(action){
    try{
        yield axios.post('/api/tree/subcategory', action.payload);
        yield put({type: 'FETCH_CURRENT_TREE', payload: action.payload.treeId})
    }
    catch(error){
        console.log('error adding subcategory', error);
    }
}

export default addSubcategory;