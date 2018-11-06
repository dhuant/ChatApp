//import authReducer from './authReducer';
import {combineReducers} from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import userReducer from './user';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    userReducer,
});
export default rootReducer;