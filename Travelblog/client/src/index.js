import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'


const middleware = [thunk];
const initialState = {};

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer  = persistReducer(persistConfig, allReducers);

const myStore = createStore(
  persistedReducer,
    // This is for the dev tool
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),

    compose(applyMiddleware(...middleware)), // ... because of [thunk]
);

let persistor = persistStore(myStore);

ReactDOM.render(
  <Provider store={myStore}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);



