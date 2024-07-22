const mongoose = require("mongoose");

// Schema de la collection Post
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);