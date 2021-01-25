import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import searchArtist from "./searchArtist";
import searchGenre from "./searchGenre";
import diveResults from "./diveResults";

const reducer = combineReducers({ searchArtist, searchGenre, diveResults });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
