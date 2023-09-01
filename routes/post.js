const router = require("express").Router();
const post = require("../models/post");
const { findById } = require("../models/user");

// create a post
router.post("/", async (req,res) => {
    const newPost = new post(req.body)
    try{
        const savePost = await newPost.save();
    } catch {
        res.status(500).json(err)
    }
})

// update a post
router.put("/:id", async (req, res) => {
    try{
        const post = post.findById(req.params.id)
        if (post.userId === req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("Post Updated")
        } else {
            res.status(403).json("you can only update you post")
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

// delete a post
router.delete("/:id", async (req, res) => {
    try{
        const post = post.findById(req.params.id)
        if (post.userId === req.body.userId){
            await post.deleteOne({$set:req.body})
            res.status(200).json("Post Deleted")
        } else {
            res.status(403).json("you can only delete you post")
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

// like and dislike a post
router.put("/:id/like", async (req, res) => {
    try {
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: { likes: req.body.userId}})
            res.status(200).json("Post has been liked")
        } else {
            await post.updateOne({ $pull: {likes: req.body.userId}})
            res.status(200).json("Post has been unliked")
        }
    } catch {
        res.status(500).json("failed to like post")
    }
})

// get a post
// get all timeline posts

module.exports = router;