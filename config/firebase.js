// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyBhgBRi_fiomzrJNTVZEL6eD9KfweNwBqU",
  authDomain: "restaurant-86653.firebaseapp.com",
  projectId: "restaurant-86653",
  storageBucket: "restaurant-86653.appspot.com",
  messagingSenderId: "339833554530",
  appId: "1:339833554530:web:0fa6e389883f81fdcb733b",
  measurementId: "G-J3QXN2K6LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage}