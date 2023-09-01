// Import the Mongoose library
const mongoose = require("mongoose");

// Define a new Mongoose schema for the "User" model
const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[],
    }
},

{
    timestamps: true  // Automatically add createdAt and updatedAt fields
})

// Export the Mongoose model for the "User" schema
module.exports = mongoose.model("Post", PostSchema);
