import React from "react";
import { NavLink } from "react-router-dom";

function NavTap({ children, path }) {
  return (
    <li>
      <NavLink to={path}>{children}</NavLink>
    </li>
  );
}

export default NavTap;
