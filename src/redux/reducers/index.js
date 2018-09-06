import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import volunteerReducer from './volunteerReducer';
import opportunitiesReducer from './opportunitiesReducer';
import volunteerInfo from './volunteerInfoReducer';
import certificationsReducer from './certificationsReducer';

const store = combineReducers({
  user,
  login,
  volunteerReducer,
  opportunitiesReducer,
  volunteerInfo,
  certificationsReducer,
});

export default store;
