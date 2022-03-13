////=================== firebase setup ====================////
//? npm ----> npm i firebase@^4.8.0 --save

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB6n5D1nfvQMlKvHcOLsoyoqCWWJ3sq8Ks",
    authDomain: "whatsapp-clone-b7ebe.firebaseapp.com",
    projectId: "whatsapp-clone-b7ebe",
    storageBucket: "whatsapp-clone-b7ebe.appspot.com",
    messagingSenderId: "957998137532",
    appId: "1:957998137532:web:b0fa7338b687b9c9ec90b9",
    measurementId: "G-JG2YL2B418"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();


const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export{
    auth,
    provider
}
export default db