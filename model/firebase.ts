
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAL2CdyAwmWChEy4JCmGAQGgL2fhpLJjUE",
  authDomain: "hospital-project-f6f55.firebaseapp.com",
  projectId: "hospital-project-f6f55",
  storageBucket: "hospital-project-f6f55.appspot.com",
  messagingSenderId: "260302106373",
  appId: "1:260302106373:web:0ac528769b608fa726d16c",
  measurementId: "G-Y22RRWZRFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
