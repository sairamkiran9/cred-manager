// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJUZx9plaZG1RV7t_9Iu_-JpeA52CRY24",
  authDomain: "cred-manager-productivity.firebaseapp.com",
  projectId: "cred-manager-productivity",
  storageBucket: "cred-manager-productivity.appspot.com",
  messagingSenderId: "996498054005",
  appId: "1:996498054005:web:4c1ee377e717567a3c113c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const fireAuth = getAuth(app);

// Firestore
export const fireDb = getFirestore(app);
export const users = collection(fireDb, "users");
export const logins = collection(fireDb, "logins");

