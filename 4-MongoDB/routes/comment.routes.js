const express=require("express");
const verifyUser=require("../middlewares/verifyUser");
const { createComment, GetAllComments, GetSingleComment, updateComment, DeleteComment, getSinglePostComments } = require("../controllers/commentCtrls");

const commentRoutes=express.Router();

commentRoutes.get("/GetAllComments/:postId",GetAllComments)
commentRoutes.post("/createComment/:postId",verifyUser,createComment);
commentRoutes.get("/GetSingleComment/:commentId",GetSingleComment);
commentRoutes.get('/getSinglePostComments/:postId',getSinglePostComments);
commentRoutes.put("/updateComment/:commentId",updateComment);
commentRoutes.delete("/deleteComment/:commentId",DeleteComment);

module.exports=commentRoutes;