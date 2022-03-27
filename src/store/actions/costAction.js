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
    .then(({ data: { costs } }) => {
      dispatch({
        type: "ADD_COST",
        payload: costs,
      });
      dispatch(getCosts());
    })
    .catch((err) => console.log(err));
};

const deleteCost = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:8000/cost/${id}`)
    .then(({ data }) => {
      dispatch({
        type: "DELETE_COST",
        payload: data,
      });
      dispatch(getCosts());
    })
    .catch((err) => console.log(err));
};

export { getCosts, addCost, deleteCost };
