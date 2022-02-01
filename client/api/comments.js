import request from "superagent";
import { handleSuccess, handleError } from "_utils/api";

export const postComments = (info) =>
  request
    .post("/api/comments")
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const getComments = () =>
  request
    .get("/api/comments")
    .then(handleSuccess)
    .catch(handleError);

export const getUsersComments = (info) =>
  request
    .get("/api/comments")
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const getPostsComments = (info) =>
  request
    .get("/api/comments")
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const putToggleCompleteComments = (info) =>
  request
    .put("/api/comments/complete")
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const putComment = (info) =>
  request
    .put("/api/comments")
    .send(info)
    .then(handleSuccess)
    .catch(handleError);
