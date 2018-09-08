const availableEvents = (state = [], action) => {
    switch (action.type) {
        case 'MY_AVAILABLE_EVENTS':
            return action.payload;
        default:
            return state;

    }
}
export default availableEvents;