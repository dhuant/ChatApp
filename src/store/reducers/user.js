import * as types from '../Actions/ActionType'
const initialState = [];
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER:
            const { uid,displayName, avatarUrl, star } = action;
            return {
                uid,
                displayName,
                avatarUrl,
                star
            }
        default:
            return state;
    }
}
export default userReducer;