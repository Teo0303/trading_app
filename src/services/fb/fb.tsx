import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/firestore";
import "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvT1TrszINYzaMTT62PiZizdt3291ufPQ",
  authDomain: "trading-app-dash.firebaseapp.com",
  databaseURL: "https://trading-app-dash.firebaseio.com",
  projectId: "trading-app-dash",
  storageBucket: "trading-app-dash.appspot.com",
  messagingSenderId: "12503232774",
  appId: "1:12503232774:web:7e487fd19d0b48968b6e87",
  measurementId: "G-PWQZFNRHJC"
};

interface Auth {
  username: string;
  password: string;
}

// const doCreateUserWithEmailAndPassword = (auth: Auth): any =>
//   auth.createUserWithEmailAndPassword(auth.email, auth.password);

// const doSignInWithEmailAndPassword = (auth: Auth): any =>
//   auth.signInWithEmailAndPassword(auth.email, auth.password);

// const doSignOut = () => auth.signOut();

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export const db = firebase.firestore();
// export const auth = firebase.auth();
// export {
//   doCreateUserWithEmailAndPassword,
//   doSignInWithEmailAndPassword,
//   doSignOut
// };

class Firebase {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;

  constructor() {
    firebase.initializeApp(firebaseConfig);

    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  doCreateUserWithEmailAndPassword = (auth: Auth): any =>
    this.auth.createUserWithEmailAndPassword(auth.username, auth.password);

  doSignInWithEmailAndPassword = (auth: Auth): any =>
    this.auth.signInWithEmailAndPassword(auth.username, auth.password);

  doSignOut = () => this.auth.signOut();
}

export default Firebase;
