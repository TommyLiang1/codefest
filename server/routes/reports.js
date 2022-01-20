const express = require("express");
const { requireAuth } = require("./middleware");
const { Post } = require("../database/schemas");
const { Comment } = require("../database/schemas");
const { Report } = require("../database/schemas");

const router = express.Router();

module.exports = router;

// get all users reports
router.get("/", requireAuth, (req, res) => {
  Report.find({ user: req.user.id }, (err, reports) => {
    if (err) {
      res.status(400).send({ message: "Get users failed", err });
    } else {
      res.send({ message: "Reports retrieved successfully", reports });
    }
  });
});

/*
// get a report by comment id or post id
router.get("/:id", requireAuth, (req, res) => {
    if(Post.findById(req.params.id) && Comment.findById(req.params.id) === null)
    {
        Post.populate("text")
        .exec(function (err, reports) {
        if (err) {
            res.status(400).send({ message: "Get users failed", err });
        } else {
            res.send({ message: "Report retrieved successfully from post", reports });
        }
        });
    }
    else if(Comment.findById(req.params.id))
    {
        Comment.populate("text")
        .exec(function (err, reports) {
        if (err) {
            res.status(400).send({ message: "Get users failed", err });
        } else {
            res.send({ message: "Report retrieved successfully from comment", reports });
        }
        });
    } 
});
*/

// get a report by post id
router.get("/post/:id", requireAuth, (req, res) => {
  Post.findById(req.params.id)
    .populate("text")
    .exec(function (err, reports) {
    if (err) {
        res.status(400).send({ message: "Get post report failed", err });
    } else {
        res.send({ message: "Report retrieved successfully from post", reports });
    }
    });
});

// get a report by comment id
router.get("/comment/:id", requireAuth, (req,res) => {
  Comment.findById(req.params.id)
    .populate("text")
    .exec(function (err, reports) {
    if (err) {
        res.status(400).send({ message: "Get comment report failed", err });
    } else {
        res.send({ message: "Report retrieved successfully from comment", reports });
    }
    });
});

router.post("/post/:id", requireAuth, (req, res) => {
  if(Post.findById(req.params.id))
  {
    const newReport = new Report({
      user: req.user.id,
      text: req.body.text,
      post: req.params.id,
    });
    newReport.save();
    Post.findById(req.params.id)
    .exec(function (err, results) {
      if (err) {
        res
          .status(400)
          .send({ message: "Report couldn't be associated to post.", err });
      } else {
        res.send({
          message: "Report has been associated to post.",
          post: results,
        });
      }
    });
  }
});

router.post("/comment/:id", requireAuth, (req, res) => {
  if(Comment.findById(req.params.id))
  {
    const newReport = new Report({
      user: req.user.id,
      text: req.body.text,
      comment: req.params.id,
    });
    newReport.save();
    Comment.findById(req.params.id)
    .exec(function (err, results) {
      if (err) {
        res
          .status(400)
          .send({ message: "Report couldn't be associated to comment.", err });
      } else {
        res.send({
          message: "Report has been associated to comment.",
          comment: results,
        });
      }
    });
  }
});

router.put("/complete", requireAuth, (req, res) => {
  Report.findById(req.body.id, { __v: 0, user: 0 }, (err, report) => {
    if (err) {
      res.status(400).send({ message: "Toggle report failed", err });
    } else {
      report.completed = !report.completed;
      report.save((err, savedReport) => {
        if (err) {
          res.status(400).send({ message: "Toggle report failed", err });
        } else {
          res.send({
            message: "Toggled complete report successfully",
            Report: savedReport,
          });
        }
      });
    }
  });
});

router.put("/", requireAuth, (req, res) => {
  Report.findById(req.body.id, { __v: 0, user: 0 }, (err, report) => {
    if (err) {
      res.status(400).send({ message: "Update report failed", err });
    } else {
      report.text = req.body.text;
      report.updated_at = Date.now();
      report.save((err, savedReport) => {
        if (err) {
          res.status(400).send({ message: "Update report failed", err });
        } else {
          res.send({ message: "Updated report successfully", post: savedReport });
        }
      });
    }
  });
});

router.delete("/", requireAuth, (req, res) => {
  Report.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      res.status(400).send({ message: "Delete post failed", err });
    } else {
      res.send({ message: "Post successfully delete" });
    }
  });
});