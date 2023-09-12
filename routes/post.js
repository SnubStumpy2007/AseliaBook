const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user"); // Import User model

// Create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body); // Note the capital 'P' in 'Post'

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Send a 201 (Created) status and the saved post as a response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" }); // Send an error response
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const postToUpdate = await Post.findById(req.params.id);
    if (postToUpdate.userId === req.body.userId) {
      await postToUpdate.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("You can only update your post");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const postToDelete = await Post.findById(req.params.id);
    if (postToDelete.userId === req.body.userId) {
      await postToDelete.deleteOne();
      res.status(200).json("Post Deleted");
    } else {
      res.status(403).json("You can only delete your post");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Like and dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been unliked");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Failed to like/unlike post");
  }
});

// Get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get all timeline posts
router.get("/timeline", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId); // Use User model
    const userPosts = await Post.find({ userId: currentUser._id });


    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
