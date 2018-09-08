import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import volunteerReducer from './volunteerReducer';
import opportunitiesReducer from './opportunitiesReducer';
import volunteerInfo from './volunteerInfoReducer';
import certificationsReducer from './certificationsReducer';
import myAvailableEventsReducer from './myAvailableEventsReducer'

const store = combineReducers({
  user,
  login,
  volunteerReducer,
  opportunitiesReducer,
  volunteerInfo,
  certificationsReducer,
  myAvailableEventsReducer
});

export default store;
