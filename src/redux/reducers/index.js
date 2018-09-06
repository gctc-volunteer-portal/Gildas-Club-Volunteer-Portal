import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import volunteerReducer from './volunteerReducer';
import opportunitiesReducer from './opportunitiesReducer';
import volunteerInfo from './volunteerInfoReducer';

const store = combineReducers({
  user,
  login,
  volunteerReducer,
  opportunitiesReducer,
  volunteerInfo,
});

export default store;
