import * as types from '../Actions/ActionType'
const initialState = [];
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER:
            const { uid,displayName, avatarUrl } = action;
            return {
                uid,
                displayName,
                avatarUrl,
            }
        default:
            return state;
    }
}
export default userReducer;