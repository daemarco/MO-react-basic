import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDPX0Relqw278XxKhL87yQ2L7QVPM9G_VU",
  authDomain: "catch-of-the-day-daemarco.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-daemarco.firebaseio.com"
  // projectId: "catch-of-the-day-daemarco",
  // storageBucket: "catch-of-the-day-daemarco.appspot.com",
  // messagingSenderId: "351690627337",
  // appId: "1:351690627337:web:c8926beb81a00170dddbd8",
  // measurementId: "G-K6J7SKHB8W"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

//This is a default export
export default base;