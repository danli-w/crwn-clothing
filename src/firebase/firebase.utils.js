import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyAxFOppvRFFxDfdbmp_OqL-sVD9JfAOpiM",
        authDomain: "crwn-db-66dad.firebaseapp.com",
        databaseURL: "https://crwn-db-66dad.firebaseio.com",
        projectId: "crwn-db-66dad",
        storageBucket: "crwn-db-66dad.appspot.com",
        messagingSenderId: "90476039081",
        appId: "1:90476039081:web:4a27377d661fc25c1e12b8",
        measurementId: "G-7JDTK2ZPT0"
};

firebase.initializeApp(config);


export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;