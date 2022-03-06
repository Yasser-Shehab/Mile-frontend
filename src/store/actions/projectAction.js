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
    .catch((err) => console.log(err));
};

const addProject = (newProject) => (dispatch) => {
  axios
    .post("http://localhost:8000/project", newProject)
    .then(({ data: { project } }) => {
      dispatch({
        type: "ADD_PROJECT",
        payload: project,
      });
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
    })
    .catch((err) => console.log(err));
};
export { getProjects, addProject, deleteProject };
