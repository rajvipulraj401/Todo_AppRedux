import { configureStore } from "@reduxjs/toolkit";
// Importing configureStore from Redux Toolkit
import todoReducer from "./slice";
// Importing todoReducer from slice file

// Configuring Redux store with todoReducer as the reducer
const store = configureStore({
  reducer: {
    todos: todoReducer,
    // Assigning todoReducer to 'todos' slice in the store
  },
});

export default store;
// Exporting the configured Redux store
