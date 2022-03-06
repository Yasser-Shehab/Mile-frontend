const INITIAL_VALUE = {
  projects: [],
  project: {},
};

const ProjectReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "GET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };

    case "ADD_PROJECT":
      return {
        ...state,
        project: action.payload,
      };

    case "DELETE_PROJECT":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default ProjectReducer;
