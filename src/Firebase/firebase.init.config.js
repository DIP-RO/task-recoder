// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJq_NI7nd-RBkj5lvHm5N42XUZbIvGeQA",
  authDomain: "task-manager-fedb7.firebaseapp.com",
  projectId: "task-manager-fedb7",
  storageBucket: "task-manager-fedb7.appspot.com",
  messagingSenderId: "385000207042",
  appId: "1:385000207042:web:ee8e387747847cc9d5815b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
