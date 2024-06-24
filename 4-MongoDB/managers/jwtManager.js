const jsonwebtoken=require("jsonwebtoken");

const jwtManager=(user)=>{

    const accessToken=jsonwebtoken.sign({_id:user._id,isAdmin:user.isAdmin},process.env.SECRET,{expiresIn:'10h'});

    return accessToken;
}

module.exports=jwtManager;