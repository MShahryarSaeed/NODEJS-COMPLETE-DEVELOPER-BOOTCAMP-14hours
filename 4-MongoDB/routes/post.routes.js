const express=require("express");
const verifyUser=require("../middlewares/verifyUser");
const { createPost, GetAllPosts, GetSinglePost, updatePost, DeletePost } = require("../controllers/PostCtrls");
const upload = require("../middlewares/image-upload");


const postRoutes=express.Router();

postRoutes.get("/GetAllPosts",GetAllPosts);
postRoutes.post("/createPost",verifyUser,upload.single('image'),createPost);
postRoutes.get("/GetSinglePost/:postId",GetSinglePost);
postRoutes.put("/updatePost/:postId",verifyUser,updatePost);
postRoutes.delete("/deletePost/:postId",verifyUser,DeletePost)

module.exports=postRoutes;