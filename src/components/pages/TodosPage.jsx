import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodo,
  getTodosForUser,
} from "../../redux/features/todosReducer";
import ButtonDeleteTodo from "../ButtonDeleteTodo";

const TodosPage = () => {
  const [value, setValue] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getTodosForUser(id));
  }, [dispatch, id]);

  const userTodos = todos
    .filter((e) => {
      if (value === "") return e;
      return e.title.toLowerCase().includes(value.value);
    })
    .map((e) => {
      return (
        <li
          className={`list-group-item form-check d-flex justify-content-between align-items-center ${
            e.completed ? "bg-warning bg-opacity-10" : ""
          }`}
          key={e.id}
        >
          {e.completing ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <input
              className="form-check-input m-0"
              type="checkbox"
              onClick={() => dispatch(completeTodo(e.id))}
              value=""
              id={e.id}
              checked={e.completed}
            />
          )}

          <label
            className={`form-check-label flex-fill d-flex align-items-center ms-2 ${
              e.completed ? "text-decoration-line-through text-secondary" : ""
            }`}
            htmlFor={e.id}
          >
            {e.title}
          </label>

          <ButtonDeleteTodo deleting={e.deleting} id={e.id} />
        </li>
      );
    });

  if (loading) return <div>Идет загрузка...</div>;

  return (
    <>
      <input
        onChange={(event) => setValue({ value: event.target.value })}
        type="text"
        className={"form-control"}
      />
      {/*<button className={"btn btn-primary ms-2"} type={"submit"}>*/}
      {/*  Добавить*/}
      {/*</button>*/}
      <ul className={"list-group mt-3"}>{userTodos}</ul>
    </>
  );
};

export default TodosPage;
