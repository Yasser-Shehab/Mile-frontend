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

    default:
      return state;
  }
};

export default WorkerReducer;
