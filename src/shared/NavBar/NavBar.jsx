import React from "react";
import NavTap from "./NavTap";

function NavBar({ children }) {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  );
}

export default NavBar;
