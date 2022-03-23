import axios from "axios";

const getProjects = () => (dispatch) => {
  axios
    .get("http://localhost:8000/project")
    .then(({ data: { projects } }) =>
      dispatch({
        type: "GET_PROJECTS",
        payload: projects,
      })
    )
    .catch((err) => {
      dispatch({
        type: "ON_ERROR",
        payload: err,
      });
    });
};

const getSingleProject = (id) => (dispatch) => {
  axios.get("http://localhost:8000/project/${id}").then(({ data }) => {
    console.log(data);
  });
};

const addProject = (newProject) => (dispatch) => {
  axios
    .post("http://localhost:8000/project", newProject)
    .then(({ data: { project } }) => {
      dispatch({
        type: "ADD_PROJECT",
        payload: project,
      });
      dispatch(getProjects());
    })
    .catch((err) => console.log(err));
};

const deleteProject = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:8000/project/${id}`)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: "DELETE_PROJECT",
        payload: data,
      });
      dispatch(getProjects());
    })
    .catch((err) => console.log(err));
};
const editProject = (data, id) => {
  return (dispatch) => {
    axios
      .patch(`http://localhost:8000/project/${id}`, data)
      .then((res) => {
        console.log("data will edit", data);
        dispatch({
          type: "EDIT_PROJECT",
          payload: data,
        });
        dispatch(getProjects());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export { getProjects, addProject, deleteProject, editProject };
