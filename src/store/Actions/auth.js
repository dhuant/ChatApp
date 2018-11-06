import './ActionType';

export const setStatus = () =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                let uid = user.uid;
                firebase.update(`users/${uid}/status`, { online: true })
                let lastOnlineRef = firebase.database().ref(`users/${uid}/status`);
                lastOnlineRef.onDisconnect().set({
                    online: false,
                    lastOnline: firebase.database.ServerValue.TIMESTAMP,
                })
            }
        })
    }

export const logOut = () =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        let user = firebase.auth().currentUser;
        if (user) {
            let uid = user.uid;
            firebase.update(`users/${uid}/status`, { online: false })
            let lastOnlineRef = firebase.database().ref(`users/${uid}/status`);
            lastOnlineRef.onDisconnect().set({
                online: false,
                lastOnline: firebase.database.ServerValue.TIMESTAMP,
            })
        }
    }