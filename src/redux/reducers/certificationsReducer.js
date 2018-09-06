import { combineReducers } from 'redux';


const certifications = (state = [], action) => {
  switch (action.type) {
    case 'GET_CERTIFICATIONS':
      return action.payload;
    default:
      return state;
  }
}


export default combineReducers({
  certifications,
})