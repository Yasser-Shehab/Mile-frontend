const INITIAL_VALUE = {
  accounts: [],
  costsSum: [],
};

const AccountReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "GET_ACCOUNTS":
      return {
        ...state,
        accounts: action.payload,
      };
    case "GET_SUM_COST":
      return {
        ...state,
        costsSum: action.payload,
      };

    default:
      return state;
  }
};

export default AccountReducer;
