import React from 'react';
import { Redirect } from 'react-router-dom';

import './RegisterPage.scss';
import DICT from './RegisterPage.dict.json';
import { useSession } from '../session';
import { SignUpForm } from '../common/AuthForms';
function RegisterPage() {
  const { isAuthenticated } = useSession();
  return (
    <>
      {!isAuthenticated ? (
        <div className='row intro text-center'>
          <div className='col-10 col-lg-3 col-md-8 card'>
            <h1 className='headline-1 text-primary mb-0'>{DICT['en'].NAME}</h1>
            <h3 className='mt-0'>{DICT['en'].TITLE}</h3>

            <p className=''>{DICT['en'].SUB_TITLE}</p>
            <SignUpForm />
          </div>
        </div>
      ) : (
        <Redirect to='/dashboard' />
      )}
    </>
  );
}

export default RegisterPage;
