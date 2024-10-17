import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App.js";

import "bootstrap/dist/css/bootstrap.min.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

//import semua combineReducer
import allReducer from "./redux/reducer/index.js"; //ini adalah file combine reducer yang isinya adalah function reducer

// Get the root element from the DOM
const rootElement = document.getElementById("root");

// import { thunk } from "redux-thunk";

const globalState = configureStore({
  reducer: allReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Create the root
const root = createRoot(rootElement);

// Render the App component
root.render(
  <Provider store={globalState}>
    <App />
  </Provider>
);
