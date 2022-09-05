import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
};

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
