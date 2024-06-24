const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"userId is Required"],
    },
    title: {
        type: String,
        required: [true,"Post title is Required"],
        unique:[true,"Post title should be Unique"]
    },

    content: {
        type: String,
        required: [true,"Post Content is Required"],
    },

    summary: {
        type: String,
        required: [true,"Expert Filed is Required"]
    },

    image:{
        type:String,
    },

    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comments"
        }
    ]

},{
    timestamps:true
});

const postModel=mongoose.model("posts",postSchema);

module.exports=postModel