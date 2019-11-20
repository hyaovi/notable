import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as ROUTES from '../../constant/routes';
import './LandingPage.scss';
import DICT from './LandingPage.dict.json';
import { useSession } from '../session';
import { SignUpForm } from '../AuthForms';

function LandingPage() {
  const { isAuthenticated } = useSession();
  return (
    <>
      {!isAuthenticated ? (
        <div className="row intro">
          <div className="col-md-8">
            <h1 className="headline-1  mb-2">{DICT['en'].NAME}</h1>
            <p className="">{DICT['en'].TITLE}</p>
            <SignUpForm />
          </div>
          <div className="col-md-16">
            <h1>{DICT['en'].TITLE}</h1>
          </div>
        </div>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </>
  );
}

export const SignInLink = () => (
  <Link className="btn text-blue" to={ROUTES.SIGN_IN}>
    Sign in
  </Link>
);
export const SignUpLink = () => (
  <Link className="btn text-grey" to={ROUTES.LANDING}>
    Sign up
  </Link>
);
export default LandingPage;
