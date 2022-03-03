import React from "react";
import AboutInfo from "./about/AboutInfo";
import Carousel from "./carousel/Carousel";

import Nav from "./nav/Nav";
import "/node_modules/primeflex/primeflex.css";

function Application() {
  return (
    <>
      <Nav />
      <AboutInfo />
      <Carousel />
    </>
  );
}

export default Application;
