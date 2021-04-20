// updating user state
export function profileReducer(state = null, action) {
    switch (action.type) {
        case "GET_PROFILE":
            return action.payload;
        case "UPDATE_PROFILE":
            return action.payload;
        case "CLEAR_PROFILE":
            return action.payload;
        default:
            return state;
    }
}