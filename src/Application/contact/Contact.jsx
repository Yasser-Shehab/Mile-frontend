import React, { useState } from "react";
import Title from "../shared/Title";
import "../assets/styles/contact/contact.css";
import { useForm, ValidationError } from "@formspree/react";

import contact1 from "../assets/imgs/contact/job1.svg";
import contact2 from "../assets/imgs/contact/job2.svg";
import contact3 from "../assets/imgs/contact/job3.svg";
import star from "../assets/imgs/contact/star.svg";
function Contact() {
  const [state, handleSubmit] = useForm("xpzblpkr");
  const [purpose, setPurpose] = useState("Job");
  // function clickHandle(event) {
  //   setPurpose(event);
  //   console.log(event);
  // }
  if (state.succeeded) {
    return (
      <div className="msg-container">
        <p>Thanks for Submitting!</p>
      </div>
    );
  }
  return (
    <>
      <Title title="تواصل معنا" id="contact-title" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="purpose"
          id="purpose"
          value={purpose}
          onChange={() => console.log(purpose)}
          hidden
        />
        <div className="contact-container">
          <div className="content-container">
            <div className="contact-title">
              <p>الغرض من التواصل</p>
            </div>
            <div className="contact-icons">
              <div
                className={purpose == "Another" ? "icon-active" : "icon"}
                onClick={() => setPurpose("Another")}
              >
                <img src={contact3} alt="another" />
                <p>أخرى</p>
              </div>
              <div className={purpose == "Project" ? "icon-active" : "icon"}>
                <img
                  src={contact2}
                  alt="company-project"
                  onClick={() => setPurpose("Project")}
                />
                <p>إنشاء مشروع</p>
              </div>
              <div className={purpose == "Job" ? "icon-active" : "icon"}>
                <img
                  src={contact1}
                  alt="job-application"
                  onClick={() => setPurpose("Job")}
                />
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
                  <input id="email" type="email" name="email" required />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>
                <div className="input-container">
                  <p>
                    <img src={star} />
                    &nbsp; الأسم
                  </p>
                  <input type="name" name="name" required />
                </div>
              </div>
              <div className="text-container">
                <p>تفاصيل</p>
                <textarea className="text-area" id="message" name="message" />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>
              <div className="form-btn">
                <div className="submit-form">
                  <i className="pi pi-angle-left" />
                  <button
                    type="submit"
                    style={{ cursor: "pointer" }}
                    disabled={state.submitting}
                  >
                    أرسال
                  </button>
                </div>
                {/* <div className="upload-file">
                  <input type="file" id="upload" hidden name="upload" />
                  <label htmlFor="upload" className="upload-text">
                    <i className="pi pi-angle-up" /> ارفع الملف
                  </label>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Contact;
