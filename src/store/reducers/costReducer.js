const INITIAL_VALUE = {
  costs: [],
};

const CostReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "GET_COSTS":
      return {
        ...state,
        costs: action.payload,
      };

    default:
      return state;
  }
};

export default CostReducer;
