import React from "react";
import Sperator from "./Sperator";
import "./style/style.css";

function Title(props) {
  return (
    <div className="title-container" id={props.id}>
      <div className="title-header">
        <p>{props.title}</p>
        <Sperator />
      </div>
    </div>
  );
}

export default Title;
