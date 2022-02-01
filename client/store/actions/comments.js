export const SET_COMMENTS = "SET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const TOGGLE_COMPLETE_COMMENT = "TOGGLE_COMPLETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const INCREMENT_COMMENT_ID = "INCREMENT_COMMENT_ID";

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
});

export const addComment = ({ id, text, createdAt}) => ({
  type: ADD_COMMENT,
  createdAt,
  id,
  text,
});

export const toggleCompleteComment = (id) => ({
  type: TOGGLE_COMPLETE_COMMENT,
  id,
});

export const updateComment = ({ id, text, updatedAt }) => ({
  type: UPDATE_COMMENT,
  updatedAt,
  id,
  text,
});
