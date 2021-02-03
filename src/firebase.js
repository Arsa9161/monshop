import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// process.env.REACT_APP_FIREBASE_API_KEY
var firebaseConfig = {
  apiKey: "AIzaSyBqzWHB9ztMEhW7O2HXeuazlOdqCa3bnDo",
  authDomain: "monshop-e2760.firebaseapp.com",
  databaseURL:
    "https://monshop-e2760-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "monshop-e2760",
  storageBucket: "monshop-e2760.appspot.com",
  messagingSenderId: "780858141428",
  appId: "1:780858141428:web:5729ecb8fae21a62318ca1",
  measurementId: "G-P1YDHP5Y5Q",
};
// Initialize Firebase
const instance = firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export default instance;
