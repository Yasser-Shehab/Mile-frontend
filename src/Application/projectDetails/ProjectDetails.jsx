import React, { useEffect, useState } from "react";
import { useParams, Link as ReactLink } from "react-router-dom";
import "../assets/styles/projectDetails/Details.css";
import axios from "axios";
import Footer from "../footer/Footer";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Image } from "primereact/image";
import Contact from "../contact/Contact";

const ProjectDetails = () => {
  const params = useParams();
  const [details, setDetails] = useState({});
  useEffect(() => {
    axios
      .get(`/project/${params.id}`)
      .then((res) => setDetails(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (details.project) {
    return (
      <>
        <div className="details-header">
          <ReactLink to="/" className="back-btn">
            العوده للصفحة الرئيسية
          </ReactLink>
          <h1>{details.project.name}</h1>
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
