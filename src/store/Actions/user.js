import * as types from '../Actions/ActionType'
import { firebaseConnect } from 'react-redux-firebase'
import firebase from 'firebase'
export const getUser = ({ uid,displayName, avatarUrl }) => {
    return {
        type: types.GET_USER,
        uid,
        displayName,
        avatarUrl,
    }
}
export const getUserFromFirebase = (id) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        firebase.database().ref(`users/${id}`).once('value').then(function (snapshot) {
            console.log(snapshot.val())
            const { displayName, avatarUrl } = snapshot.val();
            let uid = id
            dispatch(getUser({uid,displayName,avatarUrl}))
        });
    }
