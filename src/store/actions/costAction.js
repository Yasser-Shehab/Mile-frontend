import axios from "axios";

const getCosts = () => (dispatch) => {
  axios
    .get("https://mile-for-construction.herokuapp.com/cost")
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
    .post("https://mile-for-construction.herokuapp.com/cost", data)
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
    .delete(`https://mile-for-construction.herokuapp.com/cost/${id}`)
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
