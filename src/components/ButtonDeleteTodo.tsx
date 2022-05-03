import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux/features/todosReducer";

interface ButtonDeleteTodoProps {
  id: string;
  deleting: boolean;
}

const ButtonDeleteTodo: React.FC<ButtonDeleteTodoProps> = ({
  id,
  deleting,
}) => {
  const dispatch = useDispatch();

  return (
    <button
      disabled={deleting}
      className={"btn btn-outline-danger"}
      onClick={() => dispatch(deleteTodo(id))}
    >
      {deleting ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        >
          {" "}
        </span>
      ) : (
        "✕"
      )}
    </button>
  );
};

export default ButtonDeleteTodo;
