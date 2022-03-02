import React from "react";

function NavBar({ children }) {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  );
}

export default NavBar;
