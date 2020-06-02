
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as ROUTES from '../../constant/routes';
import './LandingPage.scss';
import DICT from './LandingPage.dict.json';
import { useSession } from '../session';
import { SignInForm } from '../common/AuthForms';

const Landing = () => (
  <div className="intro">
    <div className="row">
      <div className="col-md-4">
        <SignUpForm />
      </div>
      <div className="col-md-8 side-hero"></div>
    </div>
  </div>
);
function LandingPage() {
  const { isAuthenticated } = useSession();
  return (
    <>
      {!isAuthenticated ? (
        <div className='row intro text-center'>
          <div className='col-10 col-lg-3 col-md-8 card '>
            <h1 className='headline-1 text-primary  mb-0'>{DICT['en'].NAME}</h1>
            <h3 className='mt-0'>{DICT['en'].TITLE}</h3>
            {/* <p className="mb-2">{DICT['en'].SUB_TITLE}</p> */}

            <SignInForm />
          </div>
        </div>
      ) : (
        <Redirect to='/dashboard' />
      )}
    </>
  );
}

export const SignInLink = () => <Link to={ROUTES.SIGN_IN}>Sign in</Link>;
export const SignUpLink = () => <Link to={ROUTES.SIGN_UP}>Sign up</Link>;
=======

export default LandingPage;
