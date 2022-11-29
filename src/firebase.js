// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import firebase from 'firebase '
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABOqNaNbsQWN82M2_vxVNyCS-ehBrBX58",
  authDomain: "watsapp-clone-60f2d.firebaseapp.com",
  projectId: "watsapp-clone-60f2d",
  storageBucket: "watsapp-clone-60f2d.appspot.com",
  messagingSenderId: "223330330626",
  appId: "1:223330330626:web:070da3d9450faae9e19f1b"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = app.fireStore()

// export default db

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

export {db}