import * as types from '../Actions/ActionType'
import { firebaseConnect } from 'react-redux-firebase'
import firebase from 'firebase'
export const getUser = ({ uid, displayName, avatarUrl, star }) => {
    return {
        type: types.GET_USER,
        uid,
        displayName,
        avatarUrl,
        star
    }
}

export const getUserFromFirebase = (id) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                let uid = user.uid
                let priority = {}

                firebase.database().ref(`users/${uid}/priority/${id}`).once('value').then(function (snapshot) {
                    console.log(snapshot.val())
                    if (snapshot.val()) {
                        priority.isStar = snapshot.val().isStar;
                        const star = snapshot.val().isStar
                        // priority.lastChat = snapshot.val().lastChat;
                        firebase.database().ref(`users/${id}`).once('value').then(function (snapshot) {
                            console.log(snapshot.val())
                            const { displayName, avatarUrl } = snapshot.val();
                            let uid = id
                            dispatch(getUser({ uid, displayName, avatarUrl, star }))
                        });
                    }
                    else {
                        firebase.update(`users/${uid}/priority/${id}`, { isStar: false, lastChat: 0 });
                        firebase.database().ref(`users/${uid}/priority/${id}`).once('value').then(function (snapshot) {
                             priority.isStar = snapshot.val().isStar;
                            const star = snapshot.val().isStar
                            // priority.lastChat = snapshot.val().lastChat;
                            firebase.database().ref(`users/${id}`).once('value').then(function (snapshot) {
                                console.log(snapshot.val())
                                const { displayName, avatarUrl } = snapshot.val();
                                let uid = id
                                dispatch(getUser({ uid, displayName, avatarUrl, star }))
                            });
                        })
                     
                    }

                })
            }
        });
    }


export const updateLastChatUser = (id) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                let uid = user.uid;
                firebase.update(`users/${uid}/priority/${id.idReceiver}`, { lastChat: Date.now() })
                firebase.update(`users/${id.idReceiver}/priority/${uid}`, { lastChat: Date.now() })
            }
        })
    }
export const updateStarUser = (item) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        let updateStar = firebase.database().ref(`users/${item.idAuth}/priority/${item.idChatWith}`);
        updateStar.update({
            isStar: item.star,
        })
    }