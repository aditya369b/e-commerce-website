const DEFAULT_STATE = {
    items: [],
};

const itemsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
      case 'USER_SET_ITEMS':
          return{
              ...state, 
              user: action.items,
          };  
    default:
      return state;
  }
};

export default itemsReducer;
