const express=require("express");
const { GetAllUsers } = require("../controllers/userCtrl");

const userRoutes=express.Router();

// Routes
userRoutes.get("/GetAllUsers",GetAllUsers);

module.exports=userRoutes;