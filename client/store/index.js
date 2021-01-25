import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import searchArtist from "./searchArtist";
import searchGenre from "./searchGenre";
import diveResults from "./diveResults";

const persistedState = localStorage.getItem("deepDiveReduxState")
  ? JSON.parse(localStorage.getItem("deepDiveReduxState"))
  : {};

const reducer = combineReducers({ searchArtist, searchGenre, diveResults });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, persistedState, middleware);
store.subscribe(() => {
  localStorage.setItem("deepDiveReduxState", JSON.stringify(store.getState()));
});
export default store;
