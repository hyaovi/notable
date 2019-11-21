import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../actions/authActions';
import { SignUpLink } from '../../LandingPage';

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
    signIn(firebase, dispatch, userData);
  };
  const isValid = password.length > 5 && email.length > 3;

  return (
    <div className=" auth-form">
      <h3 className="">Sign in</h3>
      <form onSubmit={onSubmit}>
        <input
          className="input-lg "
          placeholder="email"
          type="email"
          value={email}
          onChange={onInputEmailChange}
        />

        <input
          className="input-lg "
          placeholder="password"
          type="password"
          value={password}
          onChange={onInputPasswordChange}
        />

        <button
          className="mx-0  btn btn-blue ml-auto"
          disabled={!isValid}
          onSubmit={onSubmit}
        >
          Register
        </button>
      </form>
      <div className="mt-8">
        <SignUpLink />
      </div>
    </div>
  );
};
