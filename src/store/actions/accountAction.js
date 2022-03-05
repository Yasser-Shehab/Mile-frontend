import axios from "axios";

const getAccounts = () => (dispatch) => {
  axios
    .get("http://localhost:8000/accounts/allaccounts")
    .then(({ data: { account } }) =>
      dispatch({
        type: "GET_ACCOUNTS",
        payload: account,
      })
    )
    .catch((err) => console.log(err));
};

const getSumCost = () => (dispatch) => {
  axios
    .get("http://localhost:8000/cost/getsum")
    .then(({ data: { costs } }) =>
      dispatch({
        type: "GET_SUM_COST",
        payload: costs,
      })
    )
    .catch((err) => console.log(err));
};

export { getAccounts, getSumCost };
