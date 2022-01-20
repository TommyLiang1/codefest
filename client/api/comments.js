import request from "superagent";
import { handleSuccess, handleError } from "_utils/api";

export const postComments = (info) =>
  request
    .post("/api/comments")
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const getComment = () =>
  request
    .get("/api/comments")
    .then(handleSuccess)
    .catch(handleError);

export const getUsersComments = () =>
  request
    .get("/api/comments")
    .then(handleSuccess)
    .catch(handleError);

export const getPostsComments = () =>
  request
    .get("/api/comments")
    .then(handleSuccess)
    .catch(handleError);

export const putToggleCompleteComments = (info) =>
  request
    .put("/api/comments/complete")
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const putComments = (info) =>
  request
    .put("/api/comments")
    .send(info)
    .then(handleSuccess)
    .catch(handleError);
