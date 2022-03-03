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

export default getProjects;
