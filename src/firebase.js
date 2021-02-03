import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBucoYZ9E1EcP9CW4K0zfEsozVMOuj4ZtU",
  authDomain: "clone-31989.firebaseapp.com",
  projectId: "clone-31989",
  storageBucket: "clone-31989.appspot.com",
  messagingSenderId: "594066183567",
  appId: "1:594066183567:web:97e46f148258e4226567fa",
  measurementId: "G-WLQ4Y8F3YG",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
