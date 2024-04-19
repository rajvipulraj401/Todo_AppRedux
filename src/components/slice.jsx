import { createSlice } from "@reduxjs/toolkit";
// Importing createSlice from Redux Toolkit

const initialState = {
  // Initial state for todos, retrieving from local storage or setting to empty array
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

// Creating a todoSlice for managing todo-related actions and state
export const todoSlice = createSlice({
  name: "todos", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer for adding a new todo
    addToTodos: (state, action) => {
      const newTodo = action.payload; // New todo object
      try {
        state.todos.push(newTodo); // Adding new todo to state
      } catch (error) {
        console.log("Error"); // Logging error if any
      }
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Saving todos to local storage
    },
    // Reducer for editing an existing todo
    editTodos: (state, action) => {
      const { id, text } = action.payload; // ID and new text for todo
      const findTodo = state.todos.find((todo) => todo.id === id); // Finding todo by ID
      if (findTodo) {
        findTodo.text = text; // Updating todo text
      }
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Saving todos to local storage
    },
    // Reducer for removing a todo
    removeFromTodos: (state, action) => {
      const id = action.payload; // ID of todo to be removed
      state.todos = state.todos.filter((todo) => todo.id !== id); // Filtering out todo to remove
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Saving todos to local storage
    },
    // Reducer for changing todo completion status
    changeTodoStatus: (state, action) => {
      const id = action.payload; // ID of todo to change status
      const findTodo = state.todos.find((todo) => todo.id === id); // Finding todo by ID
      if (!findTodo.status) {
        findTodo.status = true; // Changing status to true if it's currently false
      } else {
        findTodo.status = false; // Changing status to false if it's currently true
      }
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Saving todos to local storage
    },
    // Reducer for clearing completed todos
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => todo.status !== true); // Filtering out completed todos
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Saving todos to local storage
    },
  },
});

// Exporting actions from todoSlice
export const {
  addToTodos,
  editTodos,
  removeFromTodos,
  changeTodoStatus,
  clearCompleted,
} = todoSlice.actions;

export default todoSlice.reducer; // Exporting reducer
