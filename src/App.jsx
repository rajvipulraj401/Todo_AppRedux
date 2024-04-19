import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToTodos, clearCompleted } from "./components/slice.jsx";
import Todo from "./components/Todo.jsx";

function App() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [statusComplete, setStatusComplete] = useState(false);
  const [currentList, setCurrentList] = useState("All");

  const [lightMode, setLightMode] = useState(
    localStorage.getItem("theme") === "light" ? true : false
  );

  let todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    if (lightMode) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }

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

  function enterTodo(e) {
    if (e.key === "Enter" && text !== "" && text !== " ") {
      e.preventDefault();

      let newID = Math.floor(Math.random() * 1000);

      dispatch(
        addToTodos({
          id: newID,
          text,
          status: statusComplete,
        })
      );

      setStatusComplete(false);
      setText("");
    }
  }

  function handleTodoInput(e) {
    setText(e.target.value);
  }

  function handleClearCompleted() {
    dispatch(clearCompleted());
  }

  function handleThemeMode() {
    setLightMode((prev) => !prev);
  }

  // function handleAddTodo() {
  //   // Add your code to add a new todo here
  // }

  return (
    <main className="bg-main_background min-h-screen relative font-josefin_sans text-[14px] md:text-[16px]">
      <section className="w-full bg-no-repeat bg-cover px-6 pt-10 pb-14 flex flex-col md:pt-20 bg-light_mobile md:bg-light_desktop dark:bg-dark_mobile md:dark:bg-dark_desktop">
        <div className="flex flex-col md:w-[550px] md:px-6 md:ml-auto md:mr-auto">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl md:text-4xl uppercase text-white font-[700] tracking-[10px] cursor-pointer">
              Todo
            </h1>
            <img
              src={`${lightMode === true ? "icon-moon.svg" : "icon-sun.svg"}`}
              alt={`${
                lightMode === true ? "Dark Mode Moon" : "Light Mode Sun"
              }`}
              onClick={() => handleThemeMode()}
              className="object-contain cursor-pointer w-auto"
            />
          </nav>

          <form
            onKeyDown={(e) => enterTodo(e)}
            id="form_todos"
            className="flex mt-7 md:mt-9 md:mb-5 w-full bg-todo_item_background px-6 py-2 rounded-md items-center"
          >
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

      <section className="relative flex flex-col items-center justify-center">
        <div className="w-full relative -top-10 px-6 md:-top-14 md:w-[550px]">
          <div className="flex relative overflow-hidden flex-col w-full rounded-md bg-todo_item_background shadow-[0px_10px_10px_rgba(0,0,0,0.1)]">
            {todos &&
              currentList === "All" &&
              todos.map((todo, index) => (
                <Todo index={index} key={todo.id} todo={todo} />
              ))}

            {todos &&
              currentList === "Active" &&
              todos
                .filter((todo) => todo.status === false)
                .map((todo, index) => (
                  <Todo index={index} key={todo.id} todo={todo} />
                ))}

            {todos &&
              currentList === "Completed" &&
              todos
                .filter((todo) => todo.status === true)
                .map((todo, index) => (
                  <Todo index={index} key={todo.id} todo={todo} />
                ))}

            {todos && (
              <div className="flex w-full bg-todo_item_background px-6 py-4 items-center justify-between text-sm text-dark_grayishblue">
                <p>
                  {todos.filter((todo) => todo.status === false).length} items
                  left
                </p>
                <div className="gap-4 font-[700] hidden md:flex">
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
                <p
                  className="cursor-pointer hover:text-todo_item_text"
                  onClick={handleClearCompleted}
                >
                  Clear completed
                </p>
              </div>
            )}
          </div>
          {todos && (
            <div className="flex mb-20 w-full bg-todo_item_background px-6 py-4 mt-5 items-center justify-center gap-5 text-md font-[700] text-dark_grayishblue shadow-[0px_10px_10px_rgba(0,0,0,0.1)] md:hidden">
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
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
