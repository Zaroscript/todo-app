import React, { useRef } from "react";
import crossIcon from "./assets/icon-cross.svg";
import checkIcon from "./assets/icon-check.svg";
import { useDispatch } from "react-redux";
import { completeTodo, removeTodo } from "./features/slices/todosSlice";

function Todo({ id, content, completed, index, todosList, setTodosList }) {
  const dispatch = useDispatch();

  let todoItemDrag = useRef(0);
  let todoItemDragOver = useRef(0);

  const handleSort = () => {
    const todosClone = [...todosList];
    const temp = todosClone[todoItemDrag.current];
    todosClone[todoItemDrag.current] = todosClone[todoItemDragOver.current];
    todosClone[todoItemDragOver.current] = temp;

    setTodosList(todosClone);

  }



  return (
    <div
      className="todo"
      draggable
      onDragStart={() => (todoItemDrag.current = index)}
      onDragEnter={() => (todoItemDragOver.current = index)}
      onDragEnd={handleSort}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="outer">
        <div
          className={`circle ${completed && "active"}`}
          onClick={() => dispatch(completeTodo(id))}
        >
          <img src={checkIcon} alt="" />
        </div>
      </div>
      <div className={`todo-content ${completed && "active"}`}>
        <p>{content}</p>
        <img src={crossIcon} alt="" onClick={() => dispatch(removeTodo(id))} />
      </div>
    </div>
  );
}

export default Todo;
