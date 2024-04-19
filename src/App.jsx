import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing hooks for Redux functionality
import { addToTodos, clearCompleted } from "./components/slice.jsx"; // Importing Redux actions
import Todo from "./components/Todo.jsx"; // Importing Todo component

function App() {
  // Hook to dispatch Redux actions
  const dispatch = useDispatch();

  // State hooks for managing todo input text, completion status, current list, and theme mode
  const [text, setText] = useState(""); // State for input text
  const [statusComplete, setStatusComplete] = useState(false); // State for completion status
  const [currentList, setCurrentList] = useState("All"); // State for current list filter
  const [lightMode, setLightMode] = useState(
    // State for theme mode (light/dark)
    localStorage.getItem("theme") === "light" ? true : false // Defaulting to 'light' theme if no preference is set
  );

  // Selector hook to get todos from Redux store
  let todos = useSelector((state) => state.todos.todos);

  // Effect hook to handle theme mode changes and save to local storage
  useEffect(() => {
    // Saving theme preference to local storage
    if (lightMode) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }

    // Applying selected theme to the body
    const selectedTheme = localStorage.getItem("theme");
    document.body.classList.remove("light");
    document.body.classList.remove("dark");
    if (selectedTheme) {
      document.body.classList.add(selectedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)")) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }
  }, [lightMode]);

  // Function to add a new todo item
  function enterTodo(e) {
    // Checking if Enter key is pressed and input text is not empty
    if (e.key === "Enter" && text.trim() !== "") {
      e.preventDefault();

      // Generating random ID for new todo
      let newID = Math.floor(Math.random() * 1000);

      // Dispatching action to add new todo
      dispatch(
        addToTodos({
          id: newID,
          text,
          status: statusComplete,
        })
      );

      // Resetting input and completion status
      setStatusComplete(false);
      setText("");
    }
  }

  // Function to handle changes in input text
  function handleTodoInput(e) {
    setText(e.target.value);
  }

  // Function to clear completed todos
  function handleClearCompleted() {
    dispatch(clearCompleted());
  }

  // Function to toggle between light and dark themes
  function handleThemeMode() {
    setLightMode((prev) => !prev);
  }

  // JSX representing the app's UI
  return (
    <main className="bg-main_background min-h-screen relative font-josefin_sans text-[14px] md:text-[16px]">
      {/* Todo input section */}
      <section className="w-full bg-no-repeat bg-cover px-6 pt-10 pb-14 flex flex-col md:pt-20 bg-light_mobile md:bg-light_desktop dark:bg-dark_mobile md:dark:bg-dark_desktop">
        <div className="flex flex-col md:w-[550px] md:px-6 md:ml-auto md:mr-auto">
          {/* Header with app title and theme toggle */}
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl md:text-4xl uppercase text-white font-[700] tracking-[10px] cursor-pointer">
              Todo
            </h1>
            {/* Theme toggle button */}
            <img
              src={`${lightMode === true ? "icon-moon.svg" : "icon-sun.svg"}`}
              alt={`${
                lightMode === true ? "Dark Mode Moon" : "Light Mode Sun"
              }`}
              onClick={() => handleThemeMode()}
              className="object-contain cursor-pointer w-auto"
            />
          </nav>

          {/* Form for adding todos */}
          <form
            onKeyDown={(e) => enterTodo(e)}
            id="form_todos"
            className="flex mt-7 md:mt-9 md:mb-5 w-full bg-todo_item_background px-6 py-2 rounded-md items-center"
          >
            {/* Checkbox for completion status */}
            <div className="relative w-[28px] h-[28px] justify-center items-center rounded-full flex hover:bg-gradient-to-br hover:from-check_background_1 hover:to-check_background_2">
              <input
                checked={statusComplete}
                id="todo_complete"
                value={statusComplete}
                onChange={() => setStatusComplete((prev) => !prev)}
                type="checkbox"
                className="peer relative appearance-none w-6 h-6 border border-todo_check_outline bg-todo_item_background rounded-full focus:outline-none"
              />
            </div>
            {/* Input field for todo text */}
            <input
              id="todo_name"
              type="text"
              value={text}
              onChange={(e) => handleTodoInput(e)}
              className="ml-2 w-full px-2 py-1 bg-todo_item_background text-todo_item_text focus:outline-none"
              htmlFor="todo_complete"
              placeholder="Create a new todo..."
              required
            />
          </form>
        </div>
      </section>

      {/* Todo list section */}
      <section className="relative flex flex-col items-center justify-center">
        <div className="w-full relative -top-10 px-6 md:-top-14 md:w-[550px]">
          {/* List of todos */}
          <div className="flex relative overflow-hidden flex-col w-full rounded-md bg-todo_item_background shadow-[0px_10px_10px_rgba(0,0,0,0.1)]">
            {/* Displaying todos based on the selected list filter */}
            {todos &&
              currentList === "All" &&
              todos.map((todo, index) => (
                <Todo index={index} key={todo.id} todo={todo} />
              ))}
            {todos &&
              currentList === "Active" &&
              todos
                .filter((todo) => !todo.status)
                .map((todo, index) => (
                  <Todo index={index} key={todo.id} todo={todo} />
                ))}
            {todos &&
              currentList === "Completed" &&
              todos
                .filter((todo) => todo.status)
                .map((todo, index) => (
                  <Todo index={index} key={todo.id} todo={todo} />
                ))}
            {/* Displaying count of active todos and buttons for filtering and clearing */}
            {todos && (
              <div className="flex w-full bg-todo_item_background px-6 py-4 items-center justify-between text-sm text-dark_grayishblue">
                <p>{todos.filter((todo) => !todo.status).length} items left</p>
                <div className="gap-4 font-[700] hidden md:flex">
                  {/* Buttons for filtering todos */}
                  <p
                    onClick={() => setCurrentList("All")}
                    className={`${
                      currentList === "All"
                        ? "text-primary_brightblue"
                        : "text-dark_grayishblue hover:text-todo_item_text"
                    } cursor-pointer`}
                  >
                    All
                  </p>
                  <p
                    onClick={() => setCurrentList("Active")}
                    className={`${
                      currentList === "Active"
                        ? "text-primary_brightblue"
                        : "text-dark_grayishblue hover:text-todo_item_text"
                    } cursor-pointer`}
                  >
                    Active
                  </p>
                  <p
                    onClick={() => setCurrentList("Completed")}
                    className={`${
                      currentList === "Completed"
                        ? "text-primary_brightblue"
                        : "text-dark_grayishblue hover:text-todo_item_text"
                    } cursor-pointer`}
                  >
                    Completed
                  </p>
                </div>
                {/* Button to clear completed todos */}
                <p
                  className="cursor-pointer hover:text-todo_item_text"
                  onClick={handleClearCompleted}
                >
                  Clear completed
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
