import React, { useState } from "react";
import "../assets/styles/navStyle/nav.css";
import logo from "../assets/imgs/logo.svg";
import Navitem from "./Navitem";

function Nav() {
  const [Mobile, setMobile] = useState(false);
  const mediaQuery = "(max-width: 790px)";
  const mediaQueryList = window.matchMedia(mediaQuery);
  return (
    <>
      <div className="hero-section ">
        <div className="nav-container">
          <div
            className={Mobile ? "links-mobile" : "nav-links"}
            onMouseLeave={() => setMobile(false)}
          >
            <Navitem title="تواصل معانا" />
            <Navitem title="الوظائف" />
            <Navitem title="المشروعات" />
            <Navitem title="عن الشركة" />
          </div>
          <div className="burger" onClick={() => setMobile(!Mobile)}>
            {Mobile ? <i className="pi pi-times"></i> : <i className="pi pi-bars"></i>}
          </div>
          <div className="brand">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="title-container">
          <div className="title">
            <h1 className="title-custom">معاً </h1>
            <h1>نبني رؤيتك </h1>
          </div>
          <div className="hero-btn">
            <i className="pi pi-angle-left"></i>
            <p>تصفح اخر المشاريع </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
