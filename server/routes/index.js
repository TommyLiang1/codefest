const express = require('express');
const path = require('path');

const auth         = require('./auth');
const user         = require('./user');
const users        = require('./users');
const todos        = require('./todos');
const posts        = require('./posts');
const comments     = require('./comments');
const reports      = require('./reports');


const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/user', user);
router.use('/api/users', users);
router.use('/api/todos', todos);
router.use('/api/posts', posts);
router.use('/api/comments', comments);
router.use('/api/reports', reports);

router.get('/api/tags', (req, res) => {
  res.send([
    'MERN', 'Node', 'Express', 'Webpack', 'React', 'Redux', 'Mongoose',
    'Bulma', 'Fontawesome', 'Ramda', 'ESLint', 'Jest',
  ]);
});

router.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

module.exports = router;
