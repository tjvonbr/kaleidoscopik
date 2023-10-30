import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "kaleidoscopik-d99d3.firebaseapp.com",
  projectId: "kaleidoscopik-d99d3",
  storageBucket: "kaleidoscopik-d99d3.appspot.com",
  messagingSenderId: "558476119765",
  appId: "1:558476119765:web:6b329a4bf75a2d09eb9c5c",
  measurementId: "G-Z1GRGQG0YD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
