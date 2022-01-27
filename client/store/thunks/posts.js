import { snakeToCamelCase } from "json-style-converter/es5";
import R from "ramda";

import {
  getPosts,
  postPost,
  putToggleCompletePost,
  putPost,
  deletePost,
} from "_api/posts";
import {
  setPosts,
  addPost,
  toggleCompletePost,
  updatePost,
  removePost,
} from "_actions/posts";

import { dispatchError } from "_utils/api";

export const attemptGetPosts = () => (dispatch) =>
  getPosts()
    .then((data) => {
      const posts = R.map(
        (post) =>
          R.omit(["Id"], R.assoc("id", post._id, snakeToCamelCase(post))),
        data.posts
      );

      dispatch(setPosts(posts));
      return data.posts;
    })
    .catch(dispatchError(dispatch));

export const attemptAddPost = (text) => (dispatch) =>
  postPost({ text })
    .then((data) => {
      const post = R.omit(
        ["Id"],
        R.assoc("id", data.post._id, snakeToCamelCase(data.post))
      );

      dispatch(addPost(post));
      return data.user;
    })
    .catch(dispatchError(dispatch));

export const attemptToggleCompletePost = (id) => (dispatch) =>
  putToggleCompletePost({ id })
    .then((data) => {
      dispatch(toggleCompletePost(id));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdatePost = (id, text) => (dispatch) =>
  putPost({ id, text })
    .then((data) => {
      dispatch(updatePost({ id, text, updatedAt: data.post.updated_at }));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptDeletePost = (id) => (dispatch) =>
  deletePost({ id })
    .then((data) => {
      dispatch(removePost(id));
      return data;
    })
    .catch(dispatchError(dispatch));
