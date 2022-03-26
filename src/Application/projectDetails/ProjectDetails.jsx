import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/projectDetails/Details.css";
import axios from "axios";
import Footer from "../footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Image } from "primereact/image";
import Contact from "../contact/Contact";
import Sperator from "../shared/Sperator";

const ProjectDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const params = useParams();
  const [details, setDetails] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8000/project/${params.id}`)
      .then((res) => setDetails(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   const images = details.project.images;
  if (details.project) {
    return (
      <>
        <div>
          <h1 className="details-header">{details.project.name}</h1>
        </div>

        <div className="project-details-container">
          <div className="details-images">
            {details.project.images.map((imgSrc, i) => {
              return (
                <Image
                  key={i}
                  preview
                  downloadable
                  imageClassName="preview-img"
                  src={imgSrc}
                  alt="Image Text"
                />
              );
            })}
          </div>

          {/* {details.project.images.length > 1 && (
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mini-img"
            >
              {details.project.images.map((imgSrc, i) => {
                return (
                  <SwiperSlide key={i}>
                    <img className="mini" src={imgSrc} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )} */}
          <div className="details-desc">
            <p>{details.project.description}</p>
          </div>
        </div>
        <Contact />
        <Footer />
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default ProjectDetails;
