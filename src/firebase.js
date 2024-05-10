import { initializeApp } from "firebase/app";
import { getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  updateEmail,
} from "firebase/auth";

import
{
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  

} from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_b6NEtT5-NMFKBh5VDn8brbUUQc4GAl4",
  authDomain: "haazri-61bcb.firebaseapp.com",
  projectId: "haazri-61bcb",
  storageBucket: "haazri-61bcb.appspot.com",
  messagingSenderId: "722372575719",
  appId: "1:722372575719:web:b0f0e24e89797f262f7d42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db=getFirestore();
const auth = getAuth();


export {
    
signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getAuth,
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    onSnapshot,
    storage,
    auth,
    db,
    deleteUser,
    sendPasswordResetEmail,
    updateEmail,
    


}