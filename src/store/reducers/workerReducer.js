const INITIAL_VALUE = {
  workers: [],
};

const WorkerReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "GET_WORKERS":
      return {
        ...state,
        workers: action.payload,
      };

    default:
      return state;
  }
};

export default WorkerReducer;
