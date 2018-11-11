import * as types from '../Actions/ActionType'
import { firebaseConnect } from 'react-redux-firebase'
import firebase from 'firebase'
export const getUser = ({ uid, displayName, avatarUrl }) => {
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
            dispatch(getUser({ uid, displayName, avatarUrl }))
        });
    }
export const updateLastChatUser = (id) =>
    (dispatch, getState, getFirebase) => { 
        const firebase = getFirebase()
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                let uid = user.uid;
                firebase.update(`users/${uid}/lastChatWith`, { idChatWith: id.idReceiver, lastChat: Date.now() })
                firebase.update(`users/${id.idReceiver}/lastChatWith`, { idChatWith: id.idSender, lastChat: Date.now() })
            }
        })
    }
