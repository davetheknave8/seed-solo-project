import { put } from 'redux-saga/effects';
import axios from 'axios';

function* getLessons() {
    try {
        const response = yield axios.get('/api/tree/lesson');
        yield put({ type: 'SET_LESSONS', payload: response.data });
    }
    catch (error) {
        console.log('error getting trees', error);
    }
}

export default getLessons;