import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import volunteerReducer from './volunteerReducer'

const store = combineReducers({
  user,
  login,
  volunteerReducer
});

export default store;
