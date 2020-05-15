import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const middleware = [thunk];

const myStore = createStore(
  allReducers,
    // This is for the dev tool
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),

    compose(applyMiddleware(...middleware)), // ... because of [thunk]
);

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);


