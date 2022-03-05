import axios from "axios";

const getWorkers = () => (dispatch) => {
  axios
    .get("http://localhost:8000/worker/allWorkers")
    .then(({ data: { workers } }) =>
      dispatch({
        type: "GET_WORKERS",
        payload: workers,
      })
    )
    .catch((err) => console.log(err));
};

export default getWorkers;
