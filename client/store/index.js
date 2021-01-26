import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import searchArtist from "./searchArtist";
import searchGenre from "./searchGenre";
import diveResults from "./diveResults";
import discoveredArtists from "./discoveredArtists";

const persistedState = {};
// const persistedState = localStorage.getItem("deepDiveReduxState")
//   ? JSON.parse(localStorage.getItem("deepDiveReduxState"))
//   : {};

const appReducer = combineReducers({
  searchArtist,
  searchGenre,
  diveResults,
  discoveredArtists,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "CLEAR_STATE") {
    state = undefined;
  }

  return appReducer(state, action);
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(rootReducer, persistedState, middleware);
store.subscribe(() => {
  localStorage.setItem("deepDiveReduxState", JSON.stringify(store.getState()));
});
export default store;
