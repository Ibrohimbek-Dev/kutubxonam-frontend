import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyAz6oorPeBXaakAu8Cp5rYkcUPmLbeCW2Q",
  authDomain: "kutubxonam-fb6c3.firebaseapp.com",
  projectId: "kutubxonam-fb6c3",
  storageBucket: "kutubxonam-fb6c3.appspot.com",
  messagingSenderId: "532102483889",
  appId: "1:532102483889:web:0dc55080a2f5e19087f790",
  measurementId: "G-95YYFR0R13"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };