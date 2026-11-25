// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAeNheFMpH0MgSiOCBOR6RtbU4I-j7DbIk",
    authDomain: "mi-ecommerce-react-21bec.firebaseapp.com",
    projectId: "mi-ecommerce-react-21bec",
    storageBucket: "mi-ecommerce-react-21bec.firebasestorage.app",
    messagingSenderId: "252954439092",
    appId: "1:252954439092:web:83dcb7b61b9baaafe556e1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);