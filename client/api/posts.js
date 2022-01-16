import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const postPost = info =>
  request.post('/api/posts')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const getPosts = () =>
  request.get('/api/posts')
    .then(handleSuccess)
    .catch(handleError);

export const putToggleCompletePost = info =>
  request.put('/api/posts/completepost')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const putPost = info =>
  request.put('/api/posts')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const deletePosts = info =>
  request.delete('/api/posts')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);
