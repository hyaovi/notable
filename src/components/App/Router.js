import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.scss';
import '../../assets/sass/mint.scss';
import LandingPage from '../LandingPage';
import Dashboard from '../Dashboard';

function RouterApp() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/landing" component={LandingPage} />
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Router>
  );
}

export default RouterApp;
