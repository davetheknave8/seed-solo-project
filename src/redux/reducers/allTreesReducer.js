const allTreeReducer = (state=[], action) => {
    if(action.type === `SET_ALL_TREES`){
        return action.payload;
    } else{
        return state;
    }
}

export default allTreeReducer;