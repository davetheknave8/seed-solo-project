const allRequestsReducer = ( state=[], action) => {
    if(action.type === 'SET_REQUESTS'){
        return action.payload;
    }
    else{
        return state;
    }
}

export default allRequestsReducer;