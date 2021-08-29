import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import { todosReducer } from "./todosReducer";

export const rootReducer = combineReducers({
  users: usersReducer,
  todos: todosReducer,
});
