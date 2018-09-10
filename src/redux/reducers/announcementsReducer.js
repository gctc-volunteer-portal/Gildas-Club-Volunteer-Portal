import { combineReducers } from 'redux';


const announcements = (state = [], action) => {
  switch (action.type) {
    case 'GET_ANNOUNCEMENTS':
      return action.payload;
    default:
      return state;
  }
}


export default combineReducers({
  announcements,
})