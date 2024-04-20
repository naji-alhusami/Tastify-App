import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaQ1p8YODQdmBLsQIb-6sg709txQfTzfs",
  authDomain: "food-order-e25e0.firebaseapp.com",
  databaseURL: "https://food-order-e25e0-default-rtdb.firebaseio.com",
  projectId: "food-order-e25e0",
  storageBucket: "food-order-e25e0.appspot.com",
  messagingSenderId: "449064754566",
  appId: "1:449064754566:web:f87204e5c3f8539d1fa007",
  measurementId: "G-9CFNWX9WS1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleAuth = new GoogleAuthProvider();
export const facebookAuth = new FacebookAuthProvider();
