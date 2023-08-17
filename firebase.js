import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCqFtTNCRJciPZHtTkctJrAzSC4v1Yj24",
  authDomain: "osuntuyi-ec268.firebaseapp.com",
  projectId: "osuntuyi-ec268",
  storageBucket: "osuntuyi-ec268.appspot.com",
  messagingSenderId: "473596303019",
  appId: "1:473596303019:web:4186c1383ada6bcdf149ee",
  measurementId: "G-ZMJ9BE9VH9",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
