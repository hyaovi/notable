import React from 'react';
import { Provider } from 'react-redux';
import Router from './Router';
import store from './store';
import Firebase, { FirebaseProvider } from '../../firebase';

export default function App() {
  return (
    <Provider store={store}>
      <FirebaseProvider value={new Firebase()}>
        <Router />
      </FirebaseProvider>
    </Provider>
  );
}
