import axios from "axios";

const getSpecializations = () => (dispatch) => {
  axios
    .get("https://mile-for-construction.herokuapp.com/specialization")
    .then(({ data: { specializations } }) =>
      dispatch({
        type: "GET_SPECS",
        payload: specializations,
      })
    )
    .catch((err) => console.log(err));
};

const addSpecializations = (data) => {
  return (dispatch) => {
    axios
      .post("https://mile-for-construction.herokuapp.com/specialization", data)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "ADD_SPECS",
          payload: res.data,
        });
        dispatch(getSpecializations());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const deleteSpecializations = (id) => {
  return (dispatch) => {
    axios
      .delete(`https://mile-for-construction.herokuapp.com/specialization/${id}`)
      .then((res) => {
        console.log("delete res", res.data);
        dispatch({
          type: "DELETE_SPECS",
          payload: res.data,
        });
        dispatch(getSpecializations());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
const editSpecializations = (data, id) => {
  return (dispatch) => {
    axios
      .patch(`https://mile-for-construction.herokuapp.com/specialization/${id}`, data)
      .then((res) => {
        console.log("patch res", res);
        console.log("patch data", data);

        dispatch({
          type: "EDIT_SPECS",
          payload: data,
        });
        dispatch(getSpecializations());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export { getSpecializations, addSpecializations, deleteSpecializations, editSpecializations };
