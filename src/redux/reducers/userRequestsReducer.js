const userRequestsReducer = (state=[], action) => {
    if(action.type === 'SET_USER_REQUESTS'){
        return action.payload;
    } else{
        return state;
    }
}

export default userRequestsReducer;