// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZVXBWYy1Sixpuuw4yhHpvLlRyW3-xOLU",
  authDomain: "medvalut-auth.firebaseapp.com",
  projectId: "medvalut-auth",
  storageBucket: "medvalut-auth.appspot.com",
  messagingSenderId: "347297738621",
  appId: "1:347297738621:web:4be6d2c1ff2afc505d2614",
  measurementId: "G-7NZ2P0JRV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

const db = getFirestore(app);

export {app, auth, db};