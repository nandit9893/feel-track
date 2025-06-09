import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBlctfYYsOfFQoJFKM24lRaA65keXTuz2s",
  authDomain: "feel-track-2bd3d.firebaseapp.com",
  projectId: "feel-track-2bd3d",
  storageBucket: "feel-track-2bd3d.firebasestorage.app",
  messagingSenderId: "980143041925",
  appId: "1:980143041925:web:3aa1f78f65b9cc377b28ec",
  measurementId: "G-Y38MWGF514",
};

// Initialize Firebase
const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
