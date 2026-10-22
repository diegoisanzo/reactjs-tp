// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeNheFMpH0MgSiOCBOR6RtbU4I-j7DbIk",
    authDomain: "mi-ecommerce-react-21bec.firebaseapp.com",
    projectId: "mi-ecommerce-react-21bec",
    storageBucket: "mi-ecommerce-react-21bec.firebasestorage.app",
    messagingSenderId: "252954439092",
    appId: "1:252954439092:web:83dcb7b61b9baaafe556e1",
    measurementId: "G-EF192B5W13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);