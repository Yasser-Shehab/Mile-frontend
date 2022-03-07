const INITIAL_VALUE = {
  workers: [],
  worker: {},
};

const WorkerReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "GET_WORKERS":
      return {
        ...state,
        workers: action.payload,
      };
    case "ASIGN_PROJECT":
      return {
        ...state,
        worker: action.payload,
      };
    case "ADD_WORKER":
    case "DELETE_WORKER":
    case "EDIT_WORKER":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default WorkerReducer;
