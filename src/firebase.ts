// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxa3AHHMzslxzzXhbnbdEhWVc5IIP26u4",
  authDomain: "dem-hoi-trang-ram.firebaseapp.com",
  databaseURL: "https://dem-hoi-trang-ram-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dem-hoi-trang-ram",
  storageBucket: "dem-hoi-trang-ram.firebasestorage.app",
  messagingSenderId: "503294477076",
  appId: "1:503294477076:web:f2bdc227339e4da9ac7801",
  measurementId: "G-THQXHQWGD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);