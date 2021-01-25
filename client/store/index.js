import { createStore } from "redux";

function basicReducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(basicReducer);
export default store;
