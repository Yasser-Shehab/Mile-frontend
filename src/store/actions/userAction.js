import axios from "axios";

const login = (credentials) => (dispatch) => {
  axios
    .post(`/users/login`, credentials)
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
