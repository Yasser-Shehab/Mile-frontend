import React from "react";
import "../assets/styles/about/about.css";
import Sperator from "../shared/Sperator";
import img1 from "../assets/imgs/img1.png";
import img2 from "../assets/imgs/img2.png";
import img3 from "../assets/imgs/img3.png";
function AboutInfo() {
  return (
    <div className="container  my-8">
      <div className="title p-0">
        <p>معلومات عن شركة ميل للمقاولات العامة و التوريدات</p>
        <Sperator />
      </div>

      <div className="about-cards mt-7">
        <div className="small-cards fadeinleft animation-duration-1000">
          <div className="creation-date">
            <img src={img1} alt="tower" />
            <p> تأسست شركة مايل فور كونستراكشن في عام 2014</p>
          </div>
          <div className="mini-cards">
            <div className="projects">
              <img src={img2} alt="projects" />
              <p>عدد المشاريع</p>
              <p>30+</p>
            </div>
            <div className="projects">
              <img src={img3} alt="projects" />
              <p>عدد العاملين</p>
              <p>20+</p>
            </div>
          </div>
        </div>
        <div className="info-card fadeinright animation-duration-1000">
          <p>
            لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور
            أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
            أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي
            أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت نيولا
            باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت ,سيونت ان كيولبا أكسير
            سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي أريري
            دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت ن
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutInfo;
