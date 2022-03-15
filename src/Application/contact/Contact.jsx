import React from "react";
import Title from "../shared/Title";
import "../assets/styles/contact/contact.css";
import contact1 from "../assets/imgs/contact/job1.svg";
import contact2 from "../assets/imgs/contact/job2.svg";
import contact3 from "../assets/imgs/contact/job3.svg";
import star from "../assets/imgs/contact/star.svg";
function Contact() {
  return (
    <>
      <Title title="تواصل معنا" id="contact-title" />
      <form>
        <div className="contact-container">
          <div className="content-container">
            <div className="contact-title">
              <p>الغرض من التواصل</p>
            </div>
            <div className="contact-icons">
              <div className="icon">
                <img src={contact3} alt="another" />
                <p>أخرى</p>
              </div>
              <div className="icon">
                <img src={contact2} alt="company-project" />
                <p>إنشاء مشروع</p>
              </div>
              <div className="icon">
                <img src={contact1} alt="job-application" />
                <p>وظائف</p>
              </div>
            </div>
            <div className="contact-form">
              <div className="required-input">
                <div className="input-container">
                  <p>
                    <img src={star} />
                    &nbsp; البريد الالكتروني
                  </p>
                  <input type="email" required />
                </div>
                <div className="input-container">
                  <p>
                    <img src={star} />
                    &nbsp; الأسم
                  </p>
                  <input type="name" required />
                </div>
              </div>
              <div className="text-container">
                <p>تفاصيل</p>
                <textarea className="text-area" />
              </div>
              <div className="form-btn">
                <div className="submit-form">
                  <i className="pi pi-angle-left" />
                  <button type="submit">أرسال</button>
                </div>
                <div className="upload-file">
                  <i className="pi pi-angle-up" />
                  <button type="file">إرفع الملف</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Contact;
