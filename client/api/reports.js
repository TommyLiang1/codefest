import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const postReports = info =>
  request.post('/api/reports')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const getReports = () =>
  request.get('/api/reports')
    .then(handleSuccess)
    .catch(handleError);

export const putToggleCompleteReport = info =>
  request.put('/api/reports/complete')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const putReports = info =>
  request.put('/api/reports')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const deleteReports = info =>
  request.delete('/api/reports')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);
