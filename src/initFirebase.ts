import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"


// const config = {
//     apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
//     projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
//     authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
// }

const config = {
    apiKey: "AIzaSyC78qJ3dKFn0MDwyirTPcK3isC9T_1yTdU",
    authDomain: "grithub-5254d.firebaseapp.com",
    projectId: "grithub-5254d",
    storageBucket: "grithub-5254d.appspot.com",
    messagingSenderId: "416816848828",
    appId: "1:416816848828:web:e2750ef946f71ca59915b9"
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
