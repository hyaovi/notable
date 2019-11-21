import React from "react";
import { User, Bell } from "react-feather";
// TODO: REDESIGN NAVBAR
export default function Navbar({ DICT, taskNumber }) {
  return (
    <div className="flex">
      <span>Fantom</span>
      <div className="ml-auto">
        <span className="user-gravatar">
          <User /> <span>Maska Lefa</span>
        </span>
        <Bell />
      </div>
    </div>
  );
}
