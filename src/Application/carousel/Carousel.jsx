import React, { useEffect } from "react";
import "../assets/styles/carousel/carousel.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getProjects } from "../../store/actions/projectAction";
import bath from "../assets/imgs/carousel/bath.png";
import space from "../assets/imgs/carousel/space.png";
import bed from "../assets/imgs/carousel/bed.png";
import Title from "../shared/Title";
import AOS from "aos";
import { SkeletonCarosel } from "../skeletons/SkeletonCarosel";
import { Link } from "react-router-dom";

function Carousel() {
  AOS.init();
  const projectsList = useSelector((state) => state.projectReducer.projects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, [projectsList]); // eslint-disable-line react-hooks/exhaustive-deps
  if (projectsList) {
    return (
      <>
        <div className="section-container">
          <Title title="أبرز مشاريع الشركة" id="project-title" />
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
                      <Link key={project._id} to={`/projectDetails/${project._id}`}>
                        <img src={project.images[0]} alt="project" className="card-img-top" />
                      </Link>

                      <div className="slide-text">{project.description}</div>
                      <div className="slide-badge">
                        <p>{project.name}</p>
                      </div>
                      <div className="slide-icons">
                        <div>
                          <img src={bed} alt="" />
                          <p>x4</p>
                        </div>
                        <div>
                          <img src={bath} alt="" />
                          <p>x4</p>
                        </div>
                        <div>
                          <img src={space} alt="" />
                          <p>227 m</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="skeleton-container">
          <SkeletonCarosel />
        </div>
      </>
    );
  }
}

export default Carousel;
