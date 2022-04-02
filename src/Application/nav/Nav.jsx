import React, { useState } from "react";
import "../assets/styles/navStyle/nav.css";
import logo from "../assets/imgs/logo2.svg";
import Link from "react-scroll/modules/components/Link";

function Nav() {
  const [Mobile, setMobile] = useState(false);
  // const mediaQuery = "(max-width: 790px)";
  // const mediaQueryList = window.matchMedia(mediaQuery);
  return (
    <>
      <div className="hero-section ">
        <div className="nav-container">
          <div
            className={Mobile ? "links-mobile" : "nav-links"}
            onMouseLeave={() => setMobile(false)}
          >
            <Link smooth={true} duration={1000} className="nav-item-link" to="contact-title">
              تواصل معانا
            </Link>
            <Link smooth={true} duration={1000} className="nav-item-link" to="contact-title">
              الوظائف
            </Link>
            <Link smooth={true} duration={1000} className="nav-item-link" to="project-title">
              المشروعات
            </Link>
            <Link smooth={true} duration={1000} className="nav-item-link" to="about-title">
              عن الشركة
            </Link>
            {/* <a href="#contact-title">
              <Navitem title="تواصل معانا" />
            </a>
            <a href="#contact-title">
              <Navitem title="الوظائف" />
            </a>
            <a href="#project-title">
              <Navitem title="المشروعات" />
            </a>
            <a href="#about-title">
              <Navitem title="عن الشركة" />
            </a> */}
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
          <Link smooth={true} duration={1000} to="project-title">
            <div className="hero-btn">
              <i className="pi pi-angle-left"></i>
              <p>تصفح اخر المشاريع</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Nav;
