const volunteerInfo = (state = [], action) => {
    switch (action.type) {
        case 'SET_VOLUNTEER_INFO':
            return action.payload;
        default:
            return state;

    }
}
export default volunteerInfo;