import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyApwKgdClT01ifNPk_9wG2x0_npe45PQr4",
    authDomain: "medvaultauth.firebaseapp.com",
    projectId: "medvaultauth",
    storageBucket: "medvaultauth.firebasestorage.app",
    messagingSenderId: "527200140603",
    appId: "1:527200140603:web:66db2b93875702345dcb1e",
    measurementId: "G-JCXQ49B2E1"
  };

const app = initializeApp(firebaseConfig);

// Initialize Service
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);