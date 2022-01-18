const express = require("express");
const { requireAuth } = require("./middleware");
const { Post } = require("../database/schemas");
const { Comment } = require("../database/schemas");

const router = express.Router();

module.exports = router;

// get all users comments
router.get("/", requireAuth, (req, res) => {
  Comment.find({ user: req.user.id }, (err, comments) => {
    if (err) {
      res.status(400).send({ message: "Get users failed", err });
    } else {
      res.send({ message: "Comment retrieved successfully", comments });
    }
  });
});

// get a comment by comment id
router.get("/:id/find", requireAuth, (req, res) => {
  Comment.findOne({ _id: req.params.id })
    .populate("text")
    .exec(function (err, comments) {
      if (err) {
        res.status(400).send({ message: "Get users failed", err });
      } else {
        res.send({ message: "Comment retrieved successfully", comments });
      }
    });
});

// get comments under a post
router.get("/:id", requireAuth, (req, res) => {
  Post.findById(req.params.id)
    .populate("comments")
    .exec(function (err, results) {
      if (err) {
        res.status(400).send({ message: "Get comments failed", err });
      } else {
        res.send({
          message: "Comments retrieved successfully",
          post: results.text,
          comments: results.comments,
        });
      }
    });
});

router.post("/:id", requireAuth, (req, res) => {
  req.body.user = req.user.id;
  const newComment = new Comment({
    user: req.user.id,
    text: req.body.text,
    post: req.params.id,
  });

  newComment.save();

  Post.findById(req.params.id)
    .populate("comments")
    .exec(function (err, results) {
      if (err) {
        res
          .status(400)
          .send({ message: "Comment couldn't be associated", err });
      } else {
        results.comments.push(newComment);
        results.save();
        res.send({
          message: "Comment has been associated.",
          post: results,
        });
      }
    });
});

router.put("/:id", requireAuth, (req, res) => {
  Comment.findById(req.body.id, { __v: 0, user: 0 }, (err, comment) => {
    if (err) {
      res.status(400).send({ message: "Toggle comment failed", err });
    } else {
      comment.completed = !comment.completed;
      comment.save((err, savedComment) => {
        if (err) {
          res.status(400).send({ message: "Toggle comment failed", err });
        } else {
          res.send({
            message: "Toggled complete comment successfully",
            comment: savedComment,
          });
        }
      });
    }
  });
});

router.put("/:id", requireAuth, (req, res) => {
  Comments.findById(req.body.id, { __v: 0, user: 0 }, (err, comments) => {
    if (err) {
      res.status(400).send({ message: "Update comment failed", err });
    } else {
      comments.text = req.body.text;
      comments.updated_at = Date.now();
      comments.save((err, savedComments) => {
        if (err) {
          res.status(400).send({ message: "Update comment failed", err });
        } else {
          res.send({
            message: "Updated comment successfully",
            comments: savedComments,
          });
        }
      });
    }
  });
});
