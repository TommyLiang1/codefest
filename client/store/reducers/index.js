import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./user";
import todos from "./todos";
import posts from "./posts";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    todos,
    posts,
  });

export default createRootReducer;
