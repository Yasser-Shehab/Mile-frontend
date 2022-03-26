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

const addWorker = (data) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/worker/add", data)
      .then((res) => {
        dispatch({
          type: "ADD_WORKER",
          payload: res.data,
        });
        dispatch(getWorkers());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
const deleteWorker = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8000/worker/${id}`)
      .then((res) => {
        dispatch({
          type: "DELETE_WORKER",
          payload: res.data,
        });
        dispatch(getWorkers());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
const editWorker = (data, id) => {
  return (dispatch) => {
    axios
      .patch(`http://localhost:8000/worker/${id}`, data)
      .then((res) => {
        dispatch({
          type: "EDIT_WORKER",
          payload: data,
        });
        dispatch(getWorkers());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export { getWorkers, asignProject, addWorker, deleteWorker, editWorker };
