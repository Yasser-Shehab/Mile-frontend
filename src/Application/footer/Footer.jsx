import React from "react";
import "../assets/styles/footer/footer.css";
import img1 from "../assets/imgs/footer/img1.svg";
import img2 from "../assets/imgs/footer/img2.svg";
import img3 from "../assets/imgs/footer/img3.svg";
import img4 from "../assets/imgs/footer/img4.svg";
function Footer() {
  return (
    <div className="footer-container">
      <div className="content-container">
        <div className="footer-title">
          <p> ميل للمقاولات العامة و التوريدات , جميع حقوق النشر محفوظة ©</p>
        </div>
        <div className="footer-icons">
          <div>
            <img src={img1} alt="" />
          </div>
          <div>
            <img src={img2} alt="" />
          </div>
          <div>
            <img src={img3} alt="" />
          </div>
          <div>
            <img src={img4} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
