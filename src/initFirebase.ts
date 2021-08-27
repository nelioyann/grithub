import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"


const config = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
}


// console.log(process.env.REACT_APP_FIREBASE_CONFIG_API_KEY)
function initFirebase(){

    if(!firebase.apps.length){
        firebase.initializeApp(config)
    }
}

initFirebase()

const firebaseAuth = firebase.auth()
const firebaseStore = firebase.firestore()
const arrayUnion = firebase.firestore.FieldValue.arrayUnion
const arrayRemove = firebase.firestore.FieldValue.arrayRemove
export {firebase, firebaseAuth, firebaseStore, arrayUnion, arrayRemove}
// export const firebaseAuth = firebase.default.auth();
// export const firebaseApp = firebase.default;
