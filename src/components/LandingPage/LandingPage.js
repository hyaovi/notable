import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as ROUTES from '../../constant/routes';
import './LandingPage.scss';
import DICT from './LandingPage.dict.json';
import { useSession } from '../session';
import { SignInForm } from '../common/AuthForms';

function LandingPage() {
  const { isAuthenticated } = useSession();
  return (
    <>
      {!isAuthenticated ? (
        <div className="row intro">
          <div className="col-md-8 px-8">
            <h1 className="headline-1 text-blue  mb-2">{DICT['en'].NAME}</h1>
            <p className="">{DICT['en'].SUB_TITLE}</p>
            <SignInForm />
          </div>
          <div className="col-md-16 text-white pb-6 side-hero">
            <h1>{DICT['en'].TITLE}</h1>
          </div>
        </div>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </>
  );
}

export const SignInLink = () => <Link to={ROUTES.SIGN_IN}>Sign in</Link>;
export const SignUpLink = () => <Link to={ROUTES.SIGN_UP}>Sign up</Link>;
export default LandingPage;
