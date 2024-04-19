import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addToTodos: (state, action) => {
      const newTodo = action.payload;
      try {
        state.todos.push(newTodo);
      } catch (error) {
        console.log("Error");
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodos: (state, action) => {
      const { id, text } = action.payload;
      const findTodo = state.todos.find((todo) => todo.id === id);
      if (findTodo) {
        findTodo.text = text;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeFromTodos: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    changeTodoStatus: (state, action) => {
      const id = action.payload;
      const findTodo = state.todos.find((todo) => todo.id === id);
      if (!findTodo.status) {
        findTodo.status = true;
      } else {
        findTodo.status = false;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => todo.status !== true);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const {
  addToTodos,
  editTodos,
  removeFromTodos,
  changeTodoStatus,
  clearCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;
