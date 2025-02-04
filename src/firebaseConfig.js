
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBrHbzBlIzi9_em19fm0wAGZ9Ct-ItwV8g",
  authDomain: "student-2pageassignment.firebaseapp.com",
  projectId: "student-2pageassignment",
  storageBucket: "student-2pageassignment.firebasestorage.app",
  messagingSenderId: "660422300385",
  appId: "1:660422300385:web:4fd1d1046631fedeb39da0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth , db};