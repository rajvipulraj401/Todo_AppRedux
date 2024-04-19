import { useState } from "react";
import { useDispatch } from "react-redux"; // Importing useDispatch hook from React Redux
import { changeTodoStatus, removeFromTodos, editTodos } from "./slice"; // Importing action creators from slice file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing FontAwesomeIcon component
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"; // Importing font awesome icons

// Functional component representing a single todo item
const Todo = ({ todo, index }) => {
  // State hooks for managing edit mode, input text, hover state, and dispatch function
  const [editClicked, setEditClicked] = useState(false);
  const [text, setText] = useState(todo.text);
  const [hoverRemove, setHoverRemove] = useState(false);
  const dispatch = useDispatch();

  // Function to handle toggling todo completion status
  function handleStatusToggle() {
    dispatch(changeTodoStatus(todo.id));
  }

  // Function to handle removing a todo
  function handleRemoveTodo() {
    dispatch(removeFromTodos(todo.id));
  }

  // Function to handle adding or editing a todo
  function handleAddEditTodo(e) {
    e.preventDefault();
    if (text.trim() !== "") {
      setEditClicked(false);
      dispatch(
        editTodos({
          id: todo.id,
          text,
        })
      );
    }
  }

  // Function to handle editing a todo
  function handleEditTodo(e) {
    setText(e.target.value);
    setEditClicked(true);
  }

  // Function to handle reference of edited todo
  function handleEditReference() {
    if (todo.text !== text) {
      setEditClicked(true);
    } else {
      setEditClicked(false);
    }
  }

  // Function to handle hover on remove button
  function hoverOnRemove() {
    setHoverRemove(true);
  }

  // Function to handle hover out on remove button
  function hoverOutRemove() {
    setHoverRemove(false);
  }

  // JSX representing the todo item
  return (
    <div
      key={index}
      onMouseOver={hoverOnRemove}
      onMouseOut={hoverOutRemove}
      className="flex w-full bg-todo_item_background px-6 py-3 text-[14px] md:text-[16px] border-b-[1px] border-b-todo_item_border items-center justify-between"
    >
      <div className="flex items-center w-[90%]">
        {/* Checkbox for marking todo as completed */}
        <div className="relative w-[28px] h-[28px] justify-center items-center rounded-full flex hover:bg-gradient-to-br hover:from-check_background_1 hover:to-check_background_2">
          <input
            id={todo.id}
            type="checkbox"
            checked={todo.status}
            onChange={handleStatusToggle}
            className="peer absolute appearance-none w-6 h-6 border border-todo_check_outline bg-todo_item_background rounded-full focus:outline-none"
          />
        </div>

        {/* Input field for editing todo text */}
        <div className="relative w-full flex justify-center item-center">
          <input
            id="edit_input"
            type="text"
            key={todo.id}
            onBlur={() => handleEditReference()}
            onChange={(e) => handleEditTodo(e)}
            placeholder="Edit todo..."
            value={text}
            className={`${
              editClicked === true
                ? "ring-2 border-primary_brightblue outline-none rounded-md"
                : "border-none"
            } ${
              text.trim() === "" ? "ring-red-500/50" : "border-none"
            } ml-2 w-[100%] px-2 py-1 bg-todo_item_background border-none text-todo_item_text focus:outline-none focus:ring-2 focus:border-primary_brightblue focus:rounded-md`}
          />
          {editClicked && (
            <div className="flex justify-center items-center">
              {/* Button to confirm edit */}
              <button
                onClick={(e) => handleAddEditTodo(e)}
                className="w-7 h-7 rounded-full ml-3 p-2 flex justify-center items-center hover:bg-sky-500/20"
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-primary_brightblue w-5 h-5"
                />
              </button>
              {/* Button to cancel edit */}
              <button
                onClick={() => {
                  setText(todo.text);
                  setEditClicked(false);
                }}
                className="w-7 h-7 rounded-full ml-2 p-2 flex justify-center items-center hover:bg-red-500/20"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-red-500 w-5 h-5"
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Button to remove todo */}
      <div
        onClick={() => handleRemoveTodo()}
        className={`${
          hoverRemove === true ? "md:flex" : "md:hidden"
        } w-7 h-7 flex justify-center items-center cursor-pointer rounded-full`}
      >
        <img src="icon-cross.svg" alt="Delete" className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Todo; // Exporting the Todo component
