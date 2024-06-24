const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    fact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "facts",
        required: true,
    },
    isUpVote: {
        type: Boolean,
        required: true
    }
});

const voteModel = mongoose.model("votes", voteSchema);
module.exports = voteModel;
