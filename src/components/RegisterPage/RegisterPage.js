import React, { useState, useContext } from 'react';
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
        <div className="row intro">
          <div className="col-md-8 px-8">
            <h1 className="headline-1 text-blue  mb-2">{DICT['en'].NAME}</h1>
            <p className="">{DICT['en'].SUB_TITLE}</p>
            <SignUpForm />
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

export default RegisterPage;
