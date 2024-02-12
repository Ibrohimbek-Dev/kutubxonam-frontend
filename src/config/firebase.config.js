import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtPv17_JWI2PWmUYYxK--0cjoEA2C6U8U",
  authDomain: "kutubxonam-uz.firebaseapp.com",
  projectId: "kutubxonam-uz",
  storageBucket: "kutubxonam-uz.appspot.com",
  messagingSenderId: "970430153573",
  appId: "1:970430153573:web:7c1786a9e3be27bc0d978c",
  measurementId: "G-M3Q6BEN1HB",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
