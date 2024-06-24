const mongoose = require("mongoose");

const ebookSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "userId is Required"],
    },

    title: {
        type: String,
        required: [true, "Title is Required"],
    },

    description: {
        type: String,
        required: [true, "Description is Required"],
    },
    price: {
        type: Number,
        required: [true, "Price is Required"],
    },
    
    filename: {
        type: String,
        required: [true, "Filename is Required"],
    }

}, {
    timestamps: true
});

const ebookModel = mongoose.model("ebooks", ebookSchema);

module.exports = ebookModel;