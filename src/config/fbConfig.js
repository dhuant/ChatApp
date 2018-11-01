//import 'firebase/auth';
import {compose,applyMiddleware,createStore } from 'redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from 'firebase';
import thunk from 'redux-thunk';
import rootReducer from '../store/reducers/rootReducer'
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCWtWsilJYv7G0h0X9m_bBWBXA5yVqkS4w",
    authDomain: "chatapp-1512189.firebaseapp.com",
    databaseURL: "https://chatapp-1512189.firebaseio.com",
    projectId: "chatapp-1512189",
    storageBucket: "chatapp-1512189.appspot.com",
    messagingSenderId: "305899554852"
};
// react-redux-firebase options
const config = {
    userProfile: 'users', // firebase root where user profiles are stored
    attachAuthIsReady: true, // attaches auth is ready promise to store
  firebaseStateName: 'firebase' // should match the reducer name ('firebase' is default)    
}


// Create store with reducers and initial state

export default function configureStore (initialState = {}){
    firebase.initializeApp(firebaseConfig)

    const createStoreWithFirebase =
        compose(reactReduxFirebase(firebase, config),
            applyMiddleware(thunk.withExtraArgument(getFirebase))
        )(createStore)

    const store = createStoreWithFirebase(rootReducer);
    store.firebaseAuthIsReady.then(() => {
        console.log('Auth has loaded') // eslint-disable-line no-console
      })
    return store;
}   