import axios from "axios";

const getCosts = () => (dispatch) => {
  axios
    .get("/cost")
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
    .post("/cost", data)
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
    .delete(`/cost/${id}`)
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
