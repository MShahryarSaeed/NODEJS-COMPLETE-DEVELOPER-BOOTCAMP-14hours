const commentModel=require("../models/comment.model");
const postModel = require("../models/post.model");
const NotAuthorizedError = require("../common/errors/NotAuthorizedError");
const NotFoundError = require("../common/errors/NotFoundError");
const BadRequestError = require("../common/errors/BadRequestError");

const createComment=async(req,res)=>{

    const {postId}=req.params;
    const {content}=req.body;

    if(!postId) throw new BadRequestError("Post Id is Required")
    if(!content) throw new BadRequestError("Comment Content is Required");

    const comment=await commentModel.create({
        userId:req.user._id,
        postId:postId,
        content:content
    });

    if(!comment) throw new NotFoundError("No Comment created");

    // To push the new comment_id to postModel comments array
    const post=await postModel.findById(postId);
    if(!post) throw new NotFoundError("comment post not found");
     post.comments.push(comment?._id);
    await post.save(); 

    res.status(201).json({
        status:"Success",
        message:"Comment Created Successfully",
        comment:comment
    })

}

const GetAllComments=async(req,res)=>{

    const{postId}=req.params;
    const comments=await commentModel.find({postId:postId}).populate("postId");

    if(!comments) throw new NotFoundError("No Comments Found");

    res.status(200).json({
        status:"Success",
        message:"All Comments",
        comments:comments
    })
}

const GetSingleComment=async(req,res)=>{

    const{commentId}=req.params;

    const comment=await commentModel.findById(commentId).populate("postId");

    if(!comment) throw new NotFoundError("No Comment Found");

    res.status(200).json({
        status:"Success",
        message:"Single Comment",
        comment:comment
    })
}

const getSinglePostComments=async(req,res)=>{

    const {postId}=req.params;

    const postComments=await commentModel.find({postId:postId});

    if(!postComments) throw new NotFoundError("No Comments Found");

    res.status(200).json({
        status:"Success",
        message:"All Comments",
        comments:postComments
    });

}

const updateComment=async(req,res)=>{

    const{commentId}=req.params;
    if(!commentId) throw new BadRequestError("CommentId is Required");

    const comment=await commentModel.findById(commentId);

    if(!comment) throw new NotFoundError("No Comment Found");

    const{content}=req.body;

    const {modifiedCount}=await commentModel.updateOne(
        {_id:commentId,userId:req.user._id},
        {
            $set:{
                content:content
            }
        }
    );

    if(modifiedCount===0){
        throw new NotAuthorizedError()
    }

    res.status(200).json({
        status:"Success",
        message:"Comment Updated",
        comment:comment
    })
}

const DeleteComment=async(req,res)=>{

    const{commentId}=req.params;
    if(!commentId) throw new BadRequestError("CommentId is Required");

    const comment=await commentModel.findById(commentId);

    if(!comment) throw new NotFoundError("No Comment Found");

    const {deletedCount}= await commentModel.deleteOne({_id:commentId,userId:req.user._id});

    if(deletedCount===0){
        throw new NotAuthorizedError()
    }

    res.status(200).json({
        status:"Success",
        message:"Comment Deleted",
        comment:comment
    })
}


module.exports={createComment,GetAllComments,GetSingleComment,getSinglePostComments,updateComment,DeleteComment};