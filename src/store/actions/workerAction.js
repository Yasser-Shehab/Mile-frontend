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
const asignProject = (workerId, projectId) => (dispatch) => {
  axios
    .post(`http://localhost:8000/worker/${workerId}/asignProject`, {
      projectId,
    })
    .then(({ data: { worker } }) =>
      dispatch({
        type: "ASIGN_PROJECT",
        payload: worker,
      })
    )
    .catch((err) => console.log(err));
};

export { getWorkers, asignProject };
