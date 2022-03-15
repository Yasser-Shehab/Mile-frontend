import React, { useEffect, useState } from "react";
import "../assets/styles/carousel/carousel.css";
import Sperator from "../shared/Sperator";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getProjects } from "../../store/actions/projectAction";
// import project1 from "../assets/imgs/carousel/project1.jpg";
// import project2 from "../assets/imgs/carousel/project2.jpg";
// import project3 from "../assets/imgs/carousel/project3.jpg";
import bath from "../assets/imgs/carousel/bath.png";
import space from "../assets/imgs/carousel/space.png";
import bed from "../assets/imgs/carousel/bed.png";
import Title from "../shared/Title";

function Carousel() {
  const projectsList = useSelector((state) => state.projectReducer.projects);
  // const [project, setProject] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, []);
  if (projectsList.length != 0) {
    return (
      <>
        <Title title="أبرز مشاريع الشركة" />
        <div className="swiper-container">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={100}
            centeredSlides={true}
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 0,
              modifier: 1,
              slideShadows: false,
            }}
            grabCursor={true}
            loop={true}
            scrollbar={{
              draggable: true,
            }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
          >
            {console.log(projectsList)}
            {projectsList.map((project) => {
              return (
                <SwiperSlide className="slide" key={project._id}>
                  <div className="slide-content">
                    <img src={project.images[0]} alt="project" className="card-img-top" />
                    <div className="slide-text">{project.description}</div>
                    <div className="slide-badge">
                      <p>{project.name}</p>
                    </div>
                    <div className="slide-icons">
                      <div>
                        <img src={bed} />
                        <p>x4</p>
                      </div>
                      <div>
                        <img src={bath} />
                        <p>x4</p>
                      </div>
                      <div>
                        <img src={space} />
                        <p>227 m</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}

            {/* <SwiperSlide className="slide">
              <div className="slide-content">
                <img src={project2} alt="project" className="card-img-top" />
                <div className="slide-text">
                  عمالنا بكل أمانة ونزاهة واحترافية مطلقة.. تقديم الأفضل دومًا هو شعارنا.. نضمن لكم
                  مشروعات ذات جودة عالية بأسعارٍ تنافسية، وتوقيت مميز إننا نفخر ونقول: أن سمعتنا تتحدث
                  عن نفسها؛ لذا نستخدم قوتنا
                </div>
                <div className="slide-badge">
                  <p>فيلا مدينة الشروق</p>
                </div>
                <div className="slide-icons">
                  <div>
                    <img src={bed} />
                    <p>x4</p>
                  </div>
                  <div>
                    <img src={bath} />
                    <p>x4</p>
                  </div>
                  <div>
                    <img src={space} />
                    <p>227 m</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide">
              <div className="slide-content">
                <img src={project3} alt="project" className="card-img-top" />
                <div className="slide-text">
                  عمالنا بكل أمانة ونزاهة واحترافية مطلقة.. تقديم الأفضل دومًا هو شعارنا.. نضمن لكم
                  مشروعات ذات جودة عالية بأسعارٍ تنافسية، وتوقيت مميز إننا نفخر ونقول: أن سمعتنا تتحدث
                  عن نفسها؛ لذا نستخدم قوتنا
                </div>
                <div className="slide-badge">
                  <p>فيلا مدينة الشروق</p>
                </div>
                <div className="slide-icons">
                  <div>
                    <img src={bed} />
                    <p>x4</p>
                  </div>
                  <div>
                    <img src={bath} />
                    <p>x4</p>
                  </div>
                  <div>
                    <img src={space} />
                    <p>227 m</p>
                  </div>
                </div>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </>
    );
  } else {
    return <h1> Loading</h1>;
  }
}

export default Carousel;
