const INITIAL_VALUE = {
  token: "",
  isAuth: false,
};
let token = localStorage.getItem("token");
if (token && token !== "") {
  INITIAL_VALUE.isAuth = true;
  INITIAL_VALUE.token = token;
}

const UserReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        token: action.payload,
        isAuth: true,
      };
    default:
      return state;
  }
};

export default UserReducer;
