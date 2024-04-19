import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
// Importing Provider from React Redux
import store from "./components/store.jsx";
// Importing the Redux store
import "./index.css";

// Rendering the app to the DOM using ReactDOM.createRoot
// and wrapping the App component with Provider to connect it to the Redux store
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
