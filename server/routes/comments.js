const express = require('express');
const { requireAuth } = require('./middleware');
const { Comment } = require('../database/schemas');

const router   = express.Router();

module.exports = router;

router.get('/', requireAuth, (req, res) => {
  Comment.find({ user: req.user.id }, { __v: 0, user: 0 }, (err, comments) => {
    if (err) {
      res.status(400).send({ message: 'Get users failed', err });
    } else {
      res.send({ message: 'Comment retrieved successfully', comments });
    }
  });
});

router.post('/', requireAuth, (req, res) => {

  req.body.user = req.user.id;
  const newComment = Comment(req.body);

  newComment.save((err, savedComment) => {
    if (err) {
      res.status(400).send({ message: 'Create comment failed', err });
    } else {
      res.send({message: "Comment created successfully", comment: savedComment});
    }
  });
});

router.put('/complete', requireAuth, (req, res) => {
  Comment.findById(req.body.id, { __v: 0, user: 0 }, (err, comment) => {
    if (err) {
      res.status(400).send({ message: 'Toggle comment failed', err });
    } else {
      comment.completed = !comment.completed;
      comment.save((err, savedComment) => {
        if (err) {
          res.status(400).send({ message: 'Toggle comment failed', err });
        } else {
          res.send({ message: 'Toggled complete comment successfully', comment: savedComment });
        }
      });
    }
  });
});

router.put('/', requireAuth, (req, res) => {
  Comments.findById(req.body.id, { __v: 0, user: 0 }, (err, comments) => {
    if (err) {
      res.status(400).send({ message: 'Update comment failed', err });
    } else {
      comments.text = req.body.text;
      comments.updated_at = Date.now();
      comments.save((err, savedComments) => {
        if (err) {
          res.status(400).send({ message: 'Update comment failed', err });
        } else {
          res.send({ message: 'Updated comment successfully', comments: savedComments });
        }
      });
    }
  });
});