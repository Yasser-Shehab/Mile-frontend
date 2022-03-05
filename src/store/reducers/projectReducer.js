const INITIAL_VALUE = {
  projects: [],
};

const ProjectReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "GET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };

    default:
      return state;
  }
};

export default ProjectReducer;
