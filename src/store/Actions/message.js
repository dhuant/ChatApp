export const sendMessage = (message) =>
    (dispatch, getState, getFirebase) => {
        console.log(message)

        const firebase = getFirebase()
        let add = firebase.database().ref(`messages`);

        if (message.listImgs.length > 0) {
            let file = message.listImgs;
            let metadata = {
                contentType: 'image/*'
            };
            // Upload file and metadata to the object 'images/mountains.jpg'
            let storageRef = firebase.storage().ref();
            let promises = [];
            file.forEach(element => {
                promises.push(storageRef.child('images/' + element.name).put(element, metadata));
            });
            Promise.all(promises).then(res => {
                promises = [];
                res.forEach(element => {
                    promises.push(element.ref.getDownloadURL());
                });
                Promise.all(promises).then((imgURLs) => {
                    console.log(imgURLs);
                    message.imgUrl = imgURLs;
                    add.child(message.idMessage).push(message);
                })

            });

        }
        else {
            add.child(message.idMessage).push(message);
        }

        // let uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
        // uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        //     console.log('File available at', downloadURL);
        // });


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