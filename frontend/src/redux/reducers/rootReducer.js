import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import userReducer from './userReducer';
import sellerReducer from './sellerReducers'

export default combineReducers({
  itemsReducer,
  userReducer,
  sellerReducer
});


// If a page is refreshed, a new redux instance is created which will not have any user login infor
// Need to use something related to cookies