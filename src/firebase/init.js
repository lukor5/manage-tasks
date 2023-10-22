// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGOZbH6Tx7VUfCEcvG84sXHGzVoXa48fs",
  authDomain: "manage-tasks-29913.firebaseapp.com",
  projectId: "manage-tasks-29913",
  storageBucket: "manage-tasks-29913.appspot.com",
  messagingSenderId: "934727430006",
  appId: "1:934727430006:web:6cf35bba995b2c921bd457",
  measurementId: "G-D2CVYKCHVQ"
};

initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()
export default db

// Initialize Firebase