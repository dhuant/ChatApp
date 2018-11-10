export const sendMessage = (message) =>
    (dispatch, getState, getFirebase) => {
        console.log(message)

        const firebase = getFirebase()
        let add = firebase.database().ref(`messages`);
        add.child(message.idMessage).push(message)
        // firebase.update(`messages/${message.idMessage}`, message);
        // firebase.set()
        // firebase.auth().onAuthStateChanged(function (user) {
        //     if (user) {
        //         let uid = user.uid;
        //         firebase.update(`users/${uid}/status`, { online: true })
        //         let lastOnlineRef = firebase.database().ref(`users/${uid}/status`);
        //         lastOnlineRef.onDisconnect().set({
        //             online: false,
        //             lastOnline: firebase.database.ServerValue.TIMESTAMP,
        //         })
        //     }
        // })
    }