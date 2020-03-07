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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);


export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);

    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (colletions) => {
    const transformedCollection = colletions.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items

        };
    });

   return transformedCollection.reduce((accumulator, collection) =>{
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export default firebase;