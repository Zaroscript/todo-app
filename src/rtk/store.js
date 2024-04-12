import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/slices/themeSlice";
import todosReducer from "../features/slices/todosSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todos: todosReducer,
  },
});

