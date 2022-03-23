import React from "react";
import { Link } from "react-router-dom";

import notFound from "../assets/imgs/404.jpg";

const NotFound = () => {
  return (
    <Link to="/">
      <img class="not-found-image" src={notFound} alt="PageNotFound" />
    </Link>
  );
};

export default NotFound;
