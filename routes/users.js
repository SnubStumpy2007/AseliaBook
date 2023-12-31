const User = require("../models/user")
const router = require("express").Router();
const bcrypt = require("bcrypt")

// Update User
router.put("/:id", async(req, res) => {
    if(req.body.userId === req.params.id  || req.user.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err){
                return res.status(500).json(err)
            }
           
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json("Account has been updated")
        } catch(err) {
            res.status(500).json(err)
        }
    } 
    else {
        return res.status(403).json("You can update only on your account")
    }
}) 

// Delete User
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id  || req.user.isAdmin){
       
        try{
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account Deleted")
        } catch(err) {
            res.status(500).json(err)
        }
    } 
    else {
        return res.status(403).json("You can only delete your account")
    }
}) 

// Get a User
router.get("/:id", async(req,res) =>{
    try{
        const user = await user.findById(req.params.id)
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch(err){
        res.status(500).json(err)
    }
})

// Follow a User
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id); // Note the capital 'U' in 'User'
        const currentUser = await User.findById(req.body.userId); // Note the capital 'U' in 'User'
  
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("User has been followed");
        } else {
          res.status(403).json("You already follow this user");
        }
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    } else {
      res.status(500).json("You cannot follow yourself");
    }
  });

// Unfollow a User
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id); // Note the capital 'U' in 'User'
        const currentUser = await User.findById(req.body.userId); // Note the capital 'U' in 'User'
  
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("User has been unfollowed");
        } else {
          res.status(403).json("You already unfollow this user");
        }
      } catch (err) { // Corrected error handling
        console.error(err);
        res.status(500).json(err.message); // Send the error message
      }
    } else {
      res.status(500).json("You cannot unfollow yourself");
    }
  });
  



module.exports = router;