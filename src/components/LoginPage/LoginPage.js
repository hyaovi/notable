import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import './LoginPage.scss';
import { FirebaseContext } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signIn } from '../../actions/authActions';
import DICT from './LoginPage.dict.json';
import { useSession } from '../session';

import { SignUpLink } from '../LandingPage';
function LoginPage() {
  const { isAuthenticated } = useSession();
  return (
    <>
      {!isAuthenticated ? (
        <div className="intro">
          <div className="text-center container-fluid">
            <div>
              <h1 className="headline-1 text-white mb-2">{DICT['en'].NAME}</h1>
              <p className="text-light">{DICT['en'].TITLE}</p>
            </div>
            <div className="row ">
              <div className="col-md-10  col-xs-10 p-3">
                <SignInForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </>
  );
}

const SignInForm = () => {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onInputEmailChange = ({ target }) => setEmail(target.value);
  const onInputPasswordChange = ({ target }) => setPassword(target.value);
  const onSubmit = event => {
    event.preventDefault();
    const userData = { email, password };
    signIn(firebase, dispatch, userData);
  };
  return (
    <div className="p-4 rounded bg-white">
      <h3 className="text-center">Signin</h3>
      <form className="row" onSubmit={onSubmit}>
        <div className=" col-12">
          <input
            className="input-lg "
            placeholder="email"
            type="email"
            value={email}
            onChange={onInputEmailChange}
          />
        </div>
        <div className="col-12">
          <input
            className="input-lg "
            placeholder="password"
            type="password"
            value={password}
            onChange={onInputPasswordChange}
          />
        </div>
        <div className="col-12">
          <button className="mx-0 block btn btn-blue" onSubmit={onSubmit}>
            Submit
          </button>
        </div>
      </form>
      <div className="mt-8">
        <SignUpLink />
      </div>
    </div>
  );
};

export default LoginPage;
