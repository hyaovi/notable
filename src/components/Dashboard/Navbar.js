import React from 'react';
import { User as UserIcon } from 'react-feather';
// TODO: REDESIGN NAVBAR
import { LogOutBtn } from './Dashboard';
export default function Navbar({ DICT, taskNumber }) {
  return (
    <div className='flex  align-items-center mb-7'>
      <span>
        <a href='/'>
          <b>>Fantom</b>
        </a>
      </span>
      <div className='ml-auto flex align-items-center'>
        <span className='user-gravatar flex align-items-center mx-2 p-2 btn btn-info'>
          <UserIcon />
          <span className='mx-2'>Maska Lefa</span>
        </span>
        <LogOutBtn />
      </div>
    </div>
  );
}
