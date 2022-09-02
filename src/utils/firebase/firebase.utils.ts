import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuKkMupEhmbbRoTjtA4EJYTWhAlR6Od7Q",
  authDomain: "blogging-app-2521c.firebaseapp.com",
  projectId: "blogging-app-2521c",
  storageBucket: "blogging-app-2521c.appspot.com",
  messagingSenderId: "1073000661601",
  appId: "1:1073000661601:web:69cc8a1f9491d9be072020",
};

console.log(process.env.REACT_APP_API_KEY);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth
const auth = getAuth();

// Get Firestore
const db = getFirestore();

// Signout Auth
const signOutUser = async () => await signOut(auth);

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  displayName: string;
  createdAt: Date;
  email: string;
};

export type BlogData = {
  title: string;
  uid: string;
  blog: string;
  date: string;
  username: string;
};

export { app, auth, db, signOutUser };
