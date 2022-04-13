const INITIAL_VALUE = {
  projects: [],
  project: {},
  error: {},
};

const ProjectReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "GET_PROJECTS":
    case "GET_HOME_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };

    case "ADD_PROJECT":
      return {
        ...state,
        project: action.payload,
      };
    case "EDIT_PROJECT":
    case "DELETE_PROJECT":
      return {
        ...state,
      };
    case "ON_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ProjectReducer;
