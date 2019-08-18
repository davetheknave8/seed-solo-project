import { put } from 'redux-saga/effects';
import axios from 'axios';

function* editUser(){
    try{
        yield axios.put('/api/user');
        yield put({type: 'FETCH_USER'});
    }
    catch(error){
        console.log('error editing user', error);
    }
}

export default editUser;