const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({

  email: {
    type: String, 
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  
});

const userModel = mongoose.model("users", usersSchema);

module.exports = userModel;
