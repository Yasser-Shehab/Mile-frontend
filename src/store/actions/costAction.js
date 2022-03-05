import axios from "axios";

const getCosts = () => (dispatch) => {
  axios
    .get("http://localhost:8000/cost")
    .then(({ data: { costs } }) =>
      dispatch({
        type: "GET_COSTS",
        payload: costs,
      })
    )
    .catch((err) => console.log(err));
};

export default getCosts;
