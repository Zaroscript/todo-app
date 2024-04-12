import React, { useState } from "react";
import moonIcon from "./assets/icon-moon.svg";
import sunIcon from "./assets/icon-sun.svg";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, toggleTheme } from "./features/slices/themeSlice";
import {
  addTodo,
  clearTodos,
  selectActiveTodos,
  selectCompletedTodos,
  selectTodos,
  showActive,
  showActiveTodos,
  showAll,
  showAllTodos,
  showCompleted,
  showCompletedTodos,
} from "./features/slices/todosSlice";
import CreateTodo from "./CreateTodo";

function Todos() {
  const dark = useSelector(selectTheme);
  const todos = useSelector(selectTodos);
  const activeTodos = useSelector(selectActiveTodos);
  const completedTodos = useSelector(selectCompletedTodos);
  const show_active = useSelector(showActive);
  const show_all = useSelector(showAll);
  const show_completed = useSelector(showCompleted);
  let todosToShow;
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [todosList, setTodosList] = useState(todosToShow);

  const hanldeSubmit = (e) => {
    e.preventDefault();

    if (inputValue !== "") {
      dispatch(
        addTodo({
          id: todos.length,
          content: inputValue,
          completed: false,
        })
      );
    }

    setInputValue("");
  };

  const handleShowTodos = () => {
    if (show_active) {
      todosToShow = activeTodos;
    } else if (show_completed) {
      todosToShow = completedTodos;
    } else {
      todosToShow = todos;
    }
  };

  handleShowTodos();

  console.log(todosToShow);
  return (
    <div className="todos-container">
      <div className="todos-header">
        <h1>Todo</h1>

        <img
          src={dark ? sunIcon : moonIcon}
          onClick={() => dispatch(toggleTheme())}
        />
      </div>

      <div className="input-container">
        <form onSubmit={hanldeSubmit}>
          <button type="submit" className="circle"></button>
          <input
            type="text"
            placeholder="Create a new todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>

      <div className="todo-container">
        {todosToShow.length !== 0 ? (
          todosToShow.map((todo, index) => {
            return (
              <Todo
                index={index}
                key={todo.id}
                id={todo.id}
                content={todo.content}
                completed={todo.completed}
                setTodosList={setTodosList}
                todosList={todosList}
              />
            );
          })
        ) : (
          <CreateTodo />
        )}

        <div className="todos-footer">
          <p>{todos.length} items left</p>

          <div className="categories">
            <p
              className={`cat ${show_all && "active"}`}
              onClick={() => dispatch(showAllTodos())}
            >
              All
            </p>
            <p
              className={`cat ${show_active && "active"}`}
              onClick={() => dispatch(showActiveTodos())}
            >
              Active
            </p>
            <p
              className={`cat ${show_completed && "active"}`}
              onClick={() => dispatch(showCompletedTodos())}
            >
              Completed
            </p>
          </div>

          <p className="clear" onClick={() => dispatch(clearTodos())}>
            Clear Completed
          </p>
        </div>
      </div>

      <p>Drag and drop to reorder list</p>
    </div>
  );
}

export default Todos;
