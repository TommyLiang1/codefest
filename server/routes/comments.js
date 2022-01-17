const express = require("express");
const { requireAuth } = require("./middleware");
const { Post } = require("../database/schemas");
const { Comment } = require("../database/schemas");

const router = express.Router();

module.exports = router;

// get all users comments
router.get("/", requireAuth, (req, res) => {
  Comment.find({ user: req.user.id }, { __v: 0, user: 0 }, (err, comments) => {
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
          post: results,
        });
      }
    });
});

router.post("/:id", requireAuth, (req, res) => {
  req.body.user = req.user.id;
  const id = req.params.id;
  const newComment = new Comment({
    text: req.body.text,
    post: id,
  });

  newComment.save();
  var postRelated = Post.findById(id);
  // push the comment into the post.comments array
  // if (Array.isArray(postRelated.comments)) {
  postRelated.comments.push(newComment);
  // } else {
  //   postRelated.comments = [newComment];
  // }

  postRelated.save((err, savedComment) => {
    if (err) {
      res.status(400).send({ message: "Create comment failed", err });
    } else {
      res.send({
        message: "Comment created successfully",
        comments: savedComment.comments,
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
