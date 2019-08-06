const lessonsReducer = (state=[], action) => {
    if(action.type === 'SET_LESSONS'){
        return action.payload;
    }
    else{
        return state;
    }
}

export default lessonsReducer