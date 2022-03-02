const INITIAL_VALUE = {
  workers: [],
};

export default (state = INITIAL_VALUE, action) => {
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
