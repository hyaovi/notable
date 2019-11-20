import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as ROUTES from '../../constant/routes';
import './LandingPage.scss';
import DICT from './LandingPage.dict.json';
import { useSession } from '../session';
import { SignInForm } from '../AuthForms';

function LandingPage() {
  const { isAuthenticated } = useSession();
  return (
    <>
      {!isAuthenticated ? (
        <div className="row intro">
          <div className="col-md-6">
            <h1 className="headline-1  mb-2">{DICT['en'].NAME}</h1>
            <p className="">{DICT['en'].SUB_TITLE}</p>
            <SignInForm />
          </div>
          <div className="col-md-18 text-white pb-6 side-hero">
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
  <Link className="btn text-grey" to={ROUTES.SIGN_UP}>
    Sign up
  </Link>
);
export default LandingPage;
