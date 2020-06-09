import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

console.log('LOGS', process.env.REACT_APP_apiKey);
ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
