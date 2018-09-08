import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import volunteerReducer from './volunteerReducer';
import opportunitiesReducer from './opportunitiesReducer';
import volunteerInfo from './volunteerInfoReducer';
import certificationsReducer from './certificationsReducer';
import indVolunteerInfo from './indVolunteerInfo'

const store = combineReducers({
  user,
  login,
  volunteerReducer,
  opportunitiesReducer,
  volunteerInfo,
  certificationsReducer,
  indVolunteerInfo
});

export default store;
