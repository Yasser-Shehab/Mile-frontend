import axios from "axios";

const login = (credentials) => (dispatch) => {
  axios
    .post(`https://mile-for-construction.herokuapp.com/users/login`, credentials)
    .then(({ data: { token } }) => {
      dispatch({
        type: "LOGIN_USER",
        payload: token,
      });
    })
    .catch((err) => {
      dispatch({
        type: "ON_ERROR",
        payload: err.response,
      });
    });
};

export { login };
