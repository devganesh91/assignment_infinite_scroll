import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./CompanyReducer/reducer";

// const thunk = (store) => (next) => (action) => {
//   typeof action === "function" ? action(store.dispatch) : next(action);
// };

let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () =>
  createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
