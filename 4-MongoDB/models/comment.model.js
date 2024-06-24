const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema({


    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:[true,"PostId is Required"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    content:{
        type:String,
        required:[true,"Comment Content is Required"],
    }

},{
    timestamps:true
});

const commentModel=mongoose.model("comments",commentSchema);

module.exports=commentModel