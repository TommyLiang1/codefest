export const SET_POSTS = "SET_POSTS";
export const ADD_POST = "ADD_POST";
export const TOGGLE_COMPLETE_POST = "TOGGLE_COMPLETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const REMOVE_POST = "REMOVE_POST";
export const INCREMENT_POST_ID = "INCREMENT_POST_ID";

export const setPosts = (posts) => ({
  type: SET_POSTS,
  posts,
});

export const addPost = ({ id, text, createdAt, tags }) => ({
  type: ADD_POST,
  createdAt,
  id,
  text,
  tags,
});

export const toggleCompletePost = (id) => ({
  type: TOGGLE_COMPLETE_POST,
  id,
});

export const updatePost = ({ id, text, updatedAt }) => ({
  type: UPDATE_POST,
  updatedAt,
  id,
  text,
});

export const removePost = (id) => ({
  type: REMOVE_POST,
  id,
});
