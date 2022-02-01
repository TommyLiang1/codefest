import { snakeToCamelCase } from "json-style-converter/es5";
import R from "ramda";

import {
  getComments,
  postComments,
  putToggleCompleteComments,
  putComment,
} from "_api/comments";
import {
  setComments,
  addComment,
  toggleCompleteComment,
  updateComment,
} from "_actions/comments";

import { dispatchError } from "_utils/api";

export const attemptGetComments = () => (dispatch) =>
  getComments()
    .then((data) => {
      const comment = R.map(
        (comment) =>
          R.omit(["Id"], R.assoc("id", comment._id, snakeToCamelCase(comment))),
        data.comment
      );

      dispatch(setComments(comments));
      return data.comments;
    })
    .catch(dispatchError(dispatch));

export const attemptAddComment = (text) => (dispatch) =>
  postComment({ text })
    .then((data) => {
      const comment = R.omit(
        ["Id"],
        R.assoc("id", data.comment._id, snakeToCamelCase(data.comment))
      );

      dispatch(addComment(comment));
      return data.user;
    })
    .catch(dispatchError(dispatch));

export const attemptToggleCompleteComment = (id) => (dispatch) =>
  putToggleCompleteComment({ id })
    .then((data) => {
      dispatch(toggleCompleteComment(id));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateComment = (id, text) => (dispatch) =>
  putComment({ id, text })
    .then((data) => {
      dispatch(updateComment({ id, text, updatedAt: data.comment.updated_at }));
      return data;
    })
    .catch(dispatchError(dispatch));