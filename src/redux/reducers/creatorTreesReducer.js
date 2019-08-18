const creatorTreesReducer = (state=[], action) => {
    if (action.type === 'SET_CREATOR_TREES'){
        return action.payload;
    } else{
        return state;
    }
}

export default creatorTreesReducer;