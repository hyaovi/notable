import firebaseApp from 'firebase/app';
import { createContext } from 'react';

import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

class Firebase {
  constructor() {
    //initialize firebase
    firebaseApp.initializeApp(firebaseConfig);
    this.auth = firebaseApp.auth();
    this.db = firebaseApp.database();
  }
  //credential methods
  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  signOut = () => this.auth.signOut();

  // database methods
  user = (uid) => this.db.ref(`users/${uid}`);
  task = (uid) => this.db.ref(`tasks/${uid}`);
  users = () => this.db.ref('users');
}

const FirebaseContext = createContext(null);
const FirebaseProvider = FirebaseContext.Provider;
export default Firebase;
export { FirebaseContext, FirebaseProvider };
