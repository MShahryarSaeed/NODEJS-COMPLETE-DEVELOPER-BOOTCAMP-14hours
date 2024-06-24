const mongoose=require("mongoose");

const usersSchema=new mongoose.Schema({

    username:{
        type:String,
        required:[true,"Username is Required"],
        unique:[true,"Username Already Exists"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:[true,"Email Already Exists"]
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    ebooks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ebooks"
        }
    ]
    
},{
    timestamps:true
});

const userModel=mongoose.model("users",usersSchema);

module.exports=userModel;