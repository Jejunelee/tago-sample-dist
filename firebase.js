// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { getStorage, } from 'firebase/storage'
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGINGSENDERID, FIREBASE_APPID } from '@env';
import firestore from '@react-native-firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoL8-x-ffO1y_hj9u98HhckFsVr6NPr-c",
  authDomain: "rn-tinderapp.firebaseapp.com",
  projectId: "rn-tinderapp",
  storageBucket: "rn-tinderapp.appspot.com",
  messagingSenderId: "797166466853",
  appId: "1:797166466853:web:c888205e86aa8135e88ccc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app)

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { auth, db, firebase, firestore, storage, }