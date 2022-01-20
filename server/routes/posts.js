const express = require("express");
const { requireAuth } = require("./middleware");
const { Post } = require("../database/schemas");

const router = express.Router();

module.exports = router;

// retrieve a specific post by post id
router.get("/:id", requireAuth, (req, res) => {
  Post.findById(req.params.id)
    .populate("comments")
    .exec(function (err, results) {
      if (err) {
        res.status(400).send({ message: "Get post add failed", err });
      } else {
        res.send({ message: "Posts retrieved successfully", post: results });
      }
    });
});

// retrieve all posts
router.get("/", requireAuth, (req, res) => {
  Post.find({ user: req.user.id })
    .populate("comments")
    .exec(function (err, posts) {
      if (err) {
        res.status(400).send({ message: "Get posts failed", err });
      } else {
        res.send({
          message: "Posts retrieved successfully",
          posts,
        });
      }
    });
});

router.post("/", requireAuth, (req, res) => {
  req.body.user = req.user.id;

  const newPost = Post(req.body);

  newPost.save((err, savedPost) => {
    if (err) {
      res.status(400).send({ message: "Create post failed", err });
    } else {
      res.send({ message: "Post created successfully", post: savedPost});
    }
  });
});

router.put("/complete", requireAuth, (req, res) => {
  Post.findById(req.body.id, { __v: 0, user: 0 }, (err, post) => {
    if (err) {
      res.status(400).send({ message: "Toggle post failed", err });
    } else {
      post.completed = !post.completed;
      post.save((err, savedPost) => {
        if (err) {
          res.status(400).send({ message: "Toggle post failed", err });
        } else {
          res.send({
            message: "Toggled complete post successfully",
            post: savedPost,
          });
        }
      });
    }
  });
});

router.put("/", requireAuth, (req, res) => {
  Post.findById(req.body.id, { __v: 0, user: 0 }, (err, post) => {
    if (err) {
      res.status(400).send({ message: "Update post failed", err });
    } else {
      post.text = req.body.text;
      post.updated_at = Date.now();
      post.save((err, savedPost) => {
        if (err) {
          res.status(400).send({ message: "Update post failed", err });
        } else {
          res.send({ message: "Updated post successfully", post: savedPost });
        }
      });
    }
  });
});

router.delete("/", requireAuth, (req, res) => {
  Post.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      res.status(400).send({ message: "Delete post failed", err });
    } else {
      res.send({ message: "Post successfully delete" });
    }
  });
});
