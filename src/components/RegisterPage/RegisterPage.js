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
        <div className="row intro text-center">
          <div className="col-lg-4 col-md-8 card ">
            <h1 className="headline-1 text-primary    mb-2">
              {DICT['en'].NAME}
            </h1>
            <h4>{DICT['en'].TITLE}</h4>

            <p className="">{DICT['en'].SUB_TITLE}</p>
            <SignUpForm />
          </div>
        </div>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </>
  );
}

export default RegisterPage;
