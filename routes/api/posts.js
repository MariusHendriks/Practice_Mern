const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//
const validatePostInput = require("../../validation/post");

// Post model
const Post = require("../../models/Post");

// @route   GET api/posts/test
// @desc    Test posts route
// @acess   Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   GET api/posts/post
// @desc    Create post
// @acess   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors send 400 with current object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);
module.exports = router;
