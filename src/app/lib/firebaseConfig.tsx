// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGG38_pfHnvE4lgFykfPrDy7BudjViu3A",
  authDomain: "userslibrary-82323.firebaseapp.com",
  projectId: "userslibrary-82323",
  storageBucket: "userslibrary-82323.firebasestorage.app",
  messagingSenderId: "31898772250",
  appId: "1:31898772250:web:e4477f03dab28694e282a3",
  measurementId: "G-QFER0FPV9P",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
