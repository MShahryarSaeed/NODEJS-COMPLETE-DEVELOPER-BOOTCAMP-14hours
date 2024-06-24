const mongoose = require("mongoose");

const categories = ['HISTORY', 'SCIENCE', 'ART', 'SPORTS', 'TECHNOLOGY', 'OTHER'];

const factSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
      },

    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: categories,
        required: true
    },
    upVotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "votes"
        }
    ],
    downVotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "votes"
        }
    ],
    upvoteCount: {
        type: Number,
        default: 0
    },
    downvoteCount: {
        type: Number,
        default: 0
    }
});

const factModel = mongoose.model("facts", factSchema);
module.exports = factModel;
