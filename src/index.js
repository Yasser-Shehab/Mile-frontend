import "primereact/resources/themes/lara-dark-purple/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primereact/resources/primereact.css";
// import "primeflex/primeflex.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";
import axios from "axios";

// For GET requests
axios.interceptors.request.use(
  (req) => {
    // Add configurations here
    req.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// For POST requests
// axios.interceptors.response.use(
//   (res) => {
//     // Add configurations here
//     if (res.status === 201) {
//       console.log("Posted Successfully");
//     }
//     return res;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
