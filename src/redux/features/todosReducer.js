const initialState = {
  todos: [],
  loading: true,
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todos/load-for-user/pending":
      return {
        ...state,
        loading: true,
      };
    case "todos/load-for-user/fulfilled":
      return {
        ...state,
        loading: false,
        todos: action.payload.data.filter(
          (e) => e.userId === Number(action.payload.id)
        ),
      };
    case "todos/delete-todo/pending":
      return {
        ...state,
        todos: state.todos.map((e) => {
          if (e.id === action.payload.id) {
            return {
              ...e,
              deleting: true,
            };
          }
          return e;
        }),
      };
    case "todos/delete-todo/fulfilled":
      return {
        ...state,
        todos: state.todos.filter((e) => e.id !== action.payload.id),
      };
    case "todos/complete-todo/pending":
      return {
        ...state,
        todos: state.todos.map((e) => {
          if (e.id === action.payload.id) {
            return {
              ...e,
              completing: true,
            };
          }
          return e;
        }),
      };
    case "todos/complete-todo/fulfilled":
      return {
        ...state,
        todos: state.todos.map((e) => {
          if (e.id === action.payload.id) {
            return {
              ...e,
              completing: false,
              completed: !e.completed,
            };
          }
          return e;
        }),
      };
    default:
      return state;
  }
};

export const getTodosForUser = (id) => (dispatch) => {
  dispatch({ type: "todos/load-for-user/pending" });
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "todos/load-for-user/fulfilled",
        payload: { data, id },
      });
    });
};

export const deleteTodo = (id) => (dispatch) => {
  dispatch({ type: "todos/delete-todo/pending", payload: { id } });
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "todos/delete-todo/fulfilled",
        payload: { data, id },
      });
    });
};

export const completeTodo = (id) => (dispatch) => {
  dispatch({ type: "todos/complete-todo/pending", payload: { id } });
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "PATCH",
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "todos/complete-todo/fulfilled",
        payload: { id },
      });
    });
};

