import update from "immutability-helper";
import R from "ramda";

import {
  SET_POSTS,
  ADD_POST,
  TOGGLE_COMPLETE_POST,
  UPDATE_POST,
  REMOVE_POST,
} from "_actions/posts";

import { LOGOUT_USER } from "_actions/user";

export function post(
  state = {
    completed: false,
  },
  action
) {
  switch (action.type) {
    case ADD_POST:
      return update(state, {
        id: { $set: action.id },
        text: { $set: action.text },
        createdAt: { $set: action.createdAt },
      });
    case TOGGLE_COMPLETE_POST:
      return update(state, {
        completed: { $apply: (x) => !x },
      });
    case UPDATE_POST:
      return update(state, {
        text: { $set: action.text },
        updatedAt: { $set: action.updatedAt },
      });
    default:
      return state;
  }
}

export default function posts(state = [], action) {
  const index = R.findIndex(R.propEq("id", action.id), state);
  const updatedAtIndex = { $splice: [[index, 1, post(state[index], action)]] };

  switch (action.type) {
    case SET_POSTS:
      return update(state, { $set: action.posts });
    case ADD_POST:
      return update(state, { $push: [post(undefined, action)] });
    case TOGGLE_COMPLETE_POST:
      return update(state, updatedAtIndex);
    case UPDATE_POST:
      return update(state, updatedAtIndex);
    case REMOVE_POST:
      return update(state, { $splice: [[index, 1]] });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
