const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create  new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user and response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Login
router.post("/login", async(req,res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        !user && res.status(404).send("User Not Found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(404).json("wrong password")

        res.status(200).json(user)
    } catch(err){
        console.log(err);
        res.status(500).json(err)
    }

})

module.exports = router;
