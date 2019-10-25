import firebaseApp from 'firebase/app';
import { createContext } from 'react';

import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCKopws_jq4Yp1NJnzuCj41PqET_v8T2Tc',
  authDomain: 'notable-44fa9.firebaseapp.com',
  databaseURL: 'https://notable-44fa9.firebaseio.com',
  projectId: 'notable-44fa9',
  storageBucket: 'notable-44fa9.appspot.com',
  messagingSenderId: '349747978169',
  appId: '1:349747978169:web:ef9df8a8dd5bbf2b1fe068'
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
  user = uid => this.db.ref(`users/${uid}`);
  task = uid => this.db.ref(`tasks/${uid}`);
  users = () => this.db.ref('users');
}

const FirebaseContext = createContext(null);
const FirebaseProvider = FirebaseContext.Provider;
export default Firebase;
export { FirebaseContext, FirebaseProvider };
