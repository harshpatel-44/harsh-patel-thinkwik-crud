import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDs5C7U11rIKvDu726M9PFzNXJZEtGvN4Y",
  authDomain: "harsh-book-crud.firebaseapp.com",
  projectId: "harsh-book-crud",
  storageBucket: "harsh-book-crud.appspot.com",
  messagingSenderId: "419863812375",
  appId: "1:419863812375:web:e489eea790616bb305bf52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
