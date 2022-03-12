const INITIAL_VALUE = {
  costs: [],
  cost: {},
};

const CostReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "GET_COSTS":
      return {
        ...state,
        costs: action.payload,
      };
    case "ADD_COST":
      return {
        ...state,
        cost: action.payload,
      };

    default:
      return state;
  }
};

export default CostReducer;
