import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import * as ROUTES from "../../constant/routes";
import "./LandingPage.scss";
import { FirebaseContext } from "../../firebase";
import { useDispatch } from "react-redux";
import { signUp } from "../../actions/authActions";
import DICT from "./LandingPage.dict.json";
import { useSession } from "../session";

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
  return <>{!isAuthenticated ? <Landing /> : <Redirect to="/dashboard" />}</>;
}

const SignUpForm = () => {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onInputEmailChange = ({ target }) => setEmail(target.value);
  const onInputPasswordChange = ({ target }) => setPassword(target.value);
  const onSubmit = event => {
    event.preventDefault();
    const userData = { email, password };
    signUp(firebase, dispatch, userData);
  };
  return (
    <div className="p-4 rounded bg-white">
      <h3 className="text-center">Sign up</h3>
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
        <SignInLink />
      </div>
    </div>
  );
};

export const SignInLink = () => (
  <Link className="btn text-grey" to={ROUTES.SIGN_IN}>
    Sign in
  </Link>
);
export const SignUpLink = () => (
  <Link className="btn text-grey" to={ROUTES.LANDING}>
    Sign up
  </Link>
);
export default LandingPage;
