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
const addCost = (data) => (dispatch) => {
  axios
    .post("http://localhost:8000/cost", data)
    .then(({ data: { costs } }) =>
      dispatch({
        type: "ADD_COST",
        payload: costs,
      })
    )
    .catch((err) => console.log(err));
};

export { getCosts, addCost };
