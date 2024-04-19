import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeTodoStatus, removeFromTodos, editTodos } from "./slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ todo, index }) => {
  const [editClicked, setEditClicked] = useState(false);
  const [outlineEdit, setOutlineEdit] = useState(false);
  const [text, setText] = useState(todo.text);
  const [hoverRemove, setHoverRemove] = useState(false);

  const dispatch = useDispatch();

  function handleStatusToggle() {
    dispatch(changeTodoStatus(todo.id));
  }

  function handleRemoveTodo() {
    dispatch(removeFromTodos(todo.id));
  }

  function handleAddEditTodo(e) {
    e.preventDefault();
    if (text !== "" && text !== " ") {
      setOutlineEdit(false);
      setEditClicked(false);
      dispatch(
        editTodos({
          id: todo.id,
          text,
        })
      );
    }
  }

  function handleEditTodo(e) {
    setText(e.target.value);
    setEditClicked(true);
    if (e.target.value === todo.text) {
      setEditClicked(false);
    }
  }

  function handleEditReference() {
    if (todo.text !== text) {
      setOutlineEdit(true);
    } else {
      setOutlineEdit(false);
    }
  }

  function hoverOnRemove() {
    setHoverRemove(true);
  }

  function hoverOutRemove() {
    setHoverRemove(false);
  }

  return (
    <div
      key={index}
      onMouseOver={hoverOnRemove}
      onMouseOut={hoverOutRemove}
      className="flex w-full bg-todo_item_background px-6 py-3 text-[14px] md:text-[16px] border-b-[1px] border-b-todo_item_border items-center justify-between"
    >
      <div className="flex items-center w-[90%]">
        <div className="relative w-[28px] h-[28px] justify-center items-center rounded-full flex hover:bg-gradient-to-br hover:from-check_background_1 hover:to-check_background_2">
          <input
            id={todo.id}
            type="checkbox"
            checked={todo.status}
            onChange={handleStatusToggle}
            className="peer absolute appearance-none w-6 h-6 border border-todo_check_outline bg-todo_item_background rounded-full focus:outline-none"
          />
        </div>

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
              outlineEdit === true
                ? "ring-2 border-primary_brightblue outline-none rounded-md"
                : "border-none"
            } ${
              text === "" || text === " " ? "ring-red-500/50" : "border-none"
            } ml-2 w-[100%] px-2 py-1 bg-todo_item_background border-none text-todo_item_text focus:outline-none focus:ring-2 focus:border-primary_brightblue focus:rounded-md`}
          />
          {editClicked && (
            <div className="flex justify-center items-center">
              <button
                onClick={(e) => handleAddEditTodo(e)}
                className="w-7 h-7 rounded-full ml-3 p-2 flex justify-center items-center hover:bg-sky-500/20"
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-primary_brightblue w-5 h-5"
                />
              </button>
              <button
                onClick={() => {
                  setOutlineEdit(false);
                  setText(todo.text);
                  setEditClicked(false);
                }}
                className="w-7 h-7 rounded-full ml-2 p-2 flex justify-center items-center hover:bg-red-500/20"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-red-500 w-5 h-5"
                />
              </button>
            </div>
          )}
        </div>
      </div>
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

export default Todo;
