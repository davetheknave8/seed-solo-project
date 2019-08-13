const allUserTreesReducer = (state=[], action) => {
    if (action.type === 'SET_ALL_USER_TREES'){
        return action.payload;
    } else{
        return state;
    }
}

export default allUserTreesReducer;