import update from "immutability-helper";
import R from "ramda";

import {
  SET_COMMENTS,
  ADD_COMMENT,
  TOGGLE_COMPLETE_COMMENT,
  UPDATE_COMMENT,
} from "_actions/comments";

import { LOGOUT_USER } from "_actions/user";

export function comment(
  state = {
    completed: false,
  },
  action
) {
  switch (action.type) {
    case ADD_COMMENT:
      return update(state, {
        id: { $set: action.id },
        text: { $set: action.text },
        createdAt: { $set: action.createdAt },
      });
    case TOGGLE_COMPLETE_COMMENT:
      return update(state, {
        completed: { $apply: (x) => !x },
      });
    case UPDATE_COMMENT:
      return update(state, {
        text: { $set: action.text },
        updatedAt: { $set: action.updatedAt },
      });
    default:
      return state;
  }
}

export default function comments(state = [], action) {
  const index = R.findIndex(R.propEq("id", action.id), state);
  const updatedAtIndex = { $splice: [[index, 1, comment(state[index], action)]] };

  switch (action.type) {
    case SET_COMMENTS:
      return update(state, { $set: action.comments });
    case ADD_COMMENT:
      return update(state, { $push: [comment(undefined, action)] });
    case TOGGLE_COMPLETE_COMMENT:
      return update(state, updatedAtIndex);
    case UPDATE_COMMENT:
      return update(state, updatedAtIndex);
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
