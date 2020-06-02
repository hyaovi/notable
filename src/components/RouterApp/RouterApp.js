import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import '../../assets/sass/mint.scss';
import LandingPage from '../LandingPage';
import Dashboard from '../Dashboard';
import * as ROUTES from '../../constant/routes';
import { useAuthState } from '../session';
import { FirebaseContext } from '../../firebase';
import { setCurrentUser } from '../../actions/authActions';
import RegisterPage from '../RegisterPage/RegisterPage';

export default () => {
  const firebase = useContext(FirebaseContext);
  const { initialize, userAuth } = useAuthState(firebase);
  const dispatch = useDispatch();

  useEffect(() => {
    const setUser = () => {
      if (!initialize && userAuth) {
        setCurrentUser(dispatch, userAuth);
      }
    };
    setUser();
    return () => setUser();
  }, [initialize, userAuth, dispatch]);

  return (
    <>
      {!initialize && (
        <Router>
          <Switch>
            <Route path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={RegisterPage} />
            <Redirect from={ROUTES.ROOT} to="/dashboard" />
          </Switch>
        </Router>
      )}
    </>
  );
};
