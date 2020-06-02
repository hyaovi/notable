import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Firebase, { FirebaseProvider } from '../../firebase';
import RouterApp from '../RouterApp';
import './App.scss';

export default function App() {
  return (
    <Provider store={store}>
      <FirebaseProvider value={new Firebase()}>
        <RouterApp />
      </FirebaseProvider>
    </Provider>
  );
}
