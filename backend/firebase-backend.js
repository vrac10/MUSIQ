// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuTtkTLIcBKK6d5TN5rU60Hva77SkEpXE",
  authDomain: "musiq-6f2a8.firebaseapp.com",
  projectId: "musiq-6f2a8",
  storageBucket: "musiq-6f2a8.appspot.com",
  messagingSenderId: "297384142826",
  appId: "1:297384142826:web:7c5365bce0b710ede07493",
  measurementId: "G-DJ21EB7JTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
