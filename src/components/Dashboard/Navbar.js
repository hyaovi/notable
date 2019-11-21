import React from 'react';
// TODO: REDESIGN NAVBAR
export default function Navbar({ DICT, taskNumber }) {
  return (
    <div className=" status-bar bg-white text-sm text-center bg-light rounded-lg p-1 py-4 my-4 mx-auto">
      <p className="text-sm hidden-md-down my-2">{DICT['en'].TODAY}</p>
      <p className="font-weight-bold text-md my-1">
        {DICT['en'].YOU_HAVE} ({taskNumber}) {DICT['en'].TODO_TODAY}
      </p>
    </div>
  );
}
