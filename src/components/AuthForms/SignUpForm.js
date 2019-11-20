import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signUp } from '../../actions/authActions';
import { SignInLink } from '../LandingPage';

export default () => {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onInputEmailChange = ({ target }) => setEmail(target.value);
  const onInputPasswordChange = ({ target }) => setPassword(target.value);
  const onSubmit = event => {
    event.preventDefault();
    const userData = { email, password };
    signUp(firebase, dispatch, userData);
  };
  const isValid = password.length > 5 && email.length > 3;

  return (
    <div className="p-4 rounded bg-white">
      <h3 className="">Sign up</h3>
      <form onSubmit={onSubmit}>
        <div>
          <input
            className="input-lg "
            placeholder="email"
            type="email"
            value={email}
            onChange={onInputEmailChange}
          />
        </div>
        <div>
          <input
            className="input-lg "
            placeholder="password"
            type="password"
            value={password}
            onChange={onInputPasswordChange}
          />
        </div>
        <div>
          <button
            className="mx-0 block btn btn-blue"
            onSubmit={onSubmit}
            disabled
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-8">
        <SignInLink />
      </div>
    </div>
  );
};
