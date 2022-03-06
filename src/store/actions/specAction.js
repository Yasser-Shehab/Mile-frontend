import axios from "axios";

const getSpecializations = () => (dispatch) => {
  axios
    .get("http://localhost:8000/specialization")
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
    axios.post("http://localhost:8000/specialization", data).then(res => {
      console.log(res);
      dispatch({
        type: "ADD_SPECS",
        payload: res.data
      })
    }).catch(error => {
      console.log(error);
    })
  }

};

const deleteSpecializations = (data) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8000/specialization/${data}`, data)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "ADD_SPECS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export {getSpecializations,addSpecializations};
