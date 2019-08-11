const userReducer = (state = {logged: 1}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {logged: 1};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
