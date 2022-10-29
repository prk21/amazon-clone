// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
//import "firebase/compact/firestore";
//import "firebase/compact/auth";
//import { initializeApp } from "firebase/app";
//import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
//import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLtgiGer3Jn2ZTHoFa9W5w8mIZp9ysV4g",
  authDomain: "challenge-a9cf5.firebaseapp.com",
  projectId: "challenge-a9cf5",
  storageBucket: "challenge-a9cf5.appspot.com",
  messagingSenderId: "523096729126",
  appId: "1:523096729126:web:973f1d2bce7c1b3f09a8e7",
  measurementId: "G-145DR9R3R5",
};

//const app = initializeApp(firebaseConfig);
//const db = getFirestore(app);
//const auth = getAuth(app);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
