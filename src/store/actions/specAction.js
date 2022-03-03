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

export default getSpecializations;
