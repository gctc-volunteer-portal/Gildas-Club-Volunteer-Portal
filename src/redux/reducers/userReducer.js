import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const id = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.id || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const email = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.email || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const access_level = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.access_level || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
}

const first_initial = (state = '', action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      if (action.user.first_name) {
        return action.user.first_name.charAt(0)
      }
      else return state ;
    case USER_ACTIONS.UNSET_USER:
      return '';
    default:
      return state;
  }
}

const last_initial = (state = '', action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      if (action.user.last_name) {
        return action.user.last_name.charAt(0)
      }
      else return state;
    case USER_ACTIONS.UNSET_USER:
      return '';
    default:
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case USER_ACTIONS.REQUEST_START:
      return true;
    case USER_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

const first_name = (state = '', action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      if (action.user.first_name) {
        return action.user.first_name
      }
      else return state ;
    case USER_ACTIONS.UNSET_USER:
      return '';
    default:
      return state;
  }
}

export default combineReducers({
  id,
  email,
  access_level,
  first_initial,
  last_initial,
  isLoading,
  first_name
});
