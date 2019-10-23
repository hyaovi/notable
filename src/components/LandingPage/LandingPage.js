import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';
import DICT from './LandingPage.dict.json';

function App() {
  return (
    <div className='intro-wrapper'>
      <div className='text-center intro container-fluid'>
        <div>
          <p>{DICT['en'].TITLE}</p>

          <h1 className='headline-1 text-blue m-8 p-8'>{DICT['en'].TITLE}</h1>
          <p>
            <Link className='btn btn-blue rounded pill' to='/'>
              {DICT['en']['BTN_GET_STARTED']}
            </Link>
            <Link
              className='btn btn-light btn-light-outline rounded pill'
              to='/'
            >
              {DICT['en'].BTN_SIGN_IN}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
