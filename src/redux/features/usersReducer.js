const initialState = {
  users: [],
  loading: true,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "users/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "users/load/fulfilled":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    default:
      return state;
  }
};

export const getUsers = () => (dispatch) => {
  dispatch({ type: "users/load/pending" });
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: "users/load/fulfilled", payload: data });
    });
};
