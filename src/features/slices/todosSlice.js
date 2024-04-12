import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todo: [
      { id: 0, content: "Complete online JavaScript course", completed: true },
      { id: 1, content: "Jog around the park 3x", completed: false },
      { id: 2, content: "10 minutes meditation", completed: false },
      { id: 3, content: "Read for 1 hour", completed: false },
      { id: 4, content: "Pick up grociries", completed: false },
      {
        id: 5,
        content: "Complete Todo App on Frontend Mentor",
        completed: false,
      },
    ],
    completedTodos: [],
    activeTodos: [],

    showAll: true,
    showCompleted: false,
    showActive: false,
  },

  reducers: {
    addTodo: (state, action) => {
      state.todo.push(action.payload);
    },
    completeTodo: (state, action) => {
      state.todo.forEach((todo) => {
        todo.id === action.payload && (todo.completed = !todo.completed);
      });

      if (state.completedTodos.findIndex((todo) => todo.id === action.payload) !== -1) {
        state.completedTodos = state.completedTodos.filter(
          (todo) => todo.id !== action.payload
        );
      }
      if (
        state.activeTodos.findIndex((todo) => todo.id === action.payload) !== -1
      ) {
        state.activeTodos = state.activeTodos.filter(
          (todo) => todo.id !== action.payload
        );
      }
    },
    removeTodo: (state, action) => {
      state.todo = state.todo.filter((todo) => todo.id !== action.payload);

      if (state.completedTodos.findIndex((todo) => todo.id === action.payload) !== -1) {
        state.completedTodos = state.completedTodos.filter((todo) => todo.id !== action.payload)
      }

      if (state.activeTodos.findIndex((todo) => todo.id === action.payload) !== -1) {
        state.activeTodos = state.activeTodos.filter(
          (todo) => todo.id !== action.payload
        );
      }
    },
    clearTodos: (state) => {
      state.todo = [];
    }, 
    showCompletedTodos: (state) => {
      
      const completedTodos = state.todo.filter(
        (todo) => todo.completed === true
      );
      
      state.completedTodos = completedTodos;

      state.showAll = false;
      state.showCompleted = true;
      state.showActive = false;
    },
    showActiveTodos: (state) => {
      const activeTodos = state.todo.filter((todo) => todo.completed === false)

      state.activeTodos = activeTodos;

      state.showAll = false;
      state.showCompleted = false;
      state.showActive = true;
    },
    showAllTodos: (state) => {
      state.showAll = true;
      state.showCompleted = false;
      state.showActive = false;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  completeTodo,
  clearTodos,
  showActiveTodos,
  showCompletedTodos,
  showAllTodos,
} = todosSlice.actions;
export const selectTodos = (state) => state.todos.todo;
export const selectCompletedTodos = (state) => state.todos.completedTodos;
export const selectActiveTodos = (state) => state.todos.activeTodos;
export const showAll = (state) => state.todos.showAll;
export const showActive = (state) => state.todos.showActive;
export const showCompleted = (state) => state.todos.showCompleted;

export default todosSlice.reducer;
