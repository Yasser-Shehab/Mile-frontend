const INITIAL_VALUE = {
  accounts: [],
};

const AccountReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "GET_ACCOUNTS":
      return {
        ...state,
        accounts: action.payload,
      };

    default:
      return state;
  }
};

export default AccountReducer;
