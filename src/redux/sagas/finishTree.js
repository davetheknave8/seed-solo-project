import { put } from 'redux-saga/effects';
import axios from 'axios';

function* finishTree(action){
    try {
        axios.put('/api/tree/finish', {id: action.payload});
    } catch (error) {
        console.log('error finishing tree', error);
    }
}

export default finishTree;