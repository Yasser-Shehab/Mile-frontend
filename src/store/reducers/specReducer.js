const INITIAL_VALUE = {
  specs: [],
};

const SpecializationReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "GET_SPECS":
      return {
        ...state,
        specs: action.payload,
      };
      case "ADD_SPECS":
        return{
          ...state
          
        }

    default:
      return state;
  }
};

export default SpecializationReducer;
