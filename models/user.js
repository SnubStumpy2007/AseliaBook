// Import the Mongoose library
const mongoose = require("mongoose");

// Define a new Mongoose schema for the "User" model
const UserSchema = new mongoose.Schema({
    // User's username
    username: {
        type: String,
        required: true,  // This field is required
        min: 3,          // Minimum length of 3 characters
        max: 20,         // Maximum length of 20 characters
        unique: true     // Each username must be unique
    },
    
    // User's email address
    email: {
        type: String,
        required: true,  // This field is required
        max: 50,         // Maximum length of 50 characters
        unique: true     // Each email address must be unique
    },
    
    // User's password
    password: {
        type: String,
        required: true,  // This field is required
        min: 6           // Minimum length of 6 characters
    },
    
    // User's profile picture URL, with a default empty string
    profilePicture: {
        type: String,
        default: ""
    },
    
    // User's cover picture URL, with a default empty string
    coverPicture: {
        type: String,
        default: ""
    },
    
    // List of followers (an array of user IDs), with a default empty array
    followers: {
        type: Array,
        default: []
    },
    
    // List of users the user is following (an array of user IDs), with a default empty array
    following: {
        type: Array,
        default: []
    },
    
    // Boolean flag indicating whether the user is an admin, default is false
    isAdmin: {
        type: Boolean,
        default: false
    },
    
    // User's description (a short bio), with a maximum length of 50 characters
    desc: {
        type: String,
        max: 50
    },
    
    // User's current city, with a maximum length of 50 characters
    city: {
        type: String,
        max: 50
    },
    
    // User's hometown or place of origin, with a maximum length of 50 characters
    from: {
        type: String,
        max: 50
    },
    
    // User's relationship status (represented as a number)
    relationship: {
        type: Number,
        enum: [1, 2, 3]  // Allowed values: 1, 2, or 3
    }
},
{
    timestamps: true  // Automatically add createdAt and updatedAt fields
})

// Export the Mongoose model for the "User" schema
module.exports = mongoose.model("User", UserSchema);
