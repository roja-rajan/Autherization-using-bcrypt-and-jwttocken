const express=require("express")
const app=express();
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
var users=[];
var jwtocken="";
var signup=async(req,res,next)=>{
    try{
    const hashPwd=await bcrypt.hash(req.body.password,10);
    const user={"name":req.body.name,"password":hashPwd};
    users.push(user);
    res.json(user);
   
    }
    catch{
        res.status(500).send("Provide essential credentials");
    }
}

var login=async(req,res,next)=>{
    try{
        const user=users.find((user)=>user.name==req.body.name);
        if(user==null){
            res.status(500).send("User not found");
        }
        else{
         if (! (await bcrypt.compare(req.body.password, user.password))){
            res.status(500).send("password incorrect");
         }
         else{
            console.log("login successfull");
            const tocken=jwt.sign(user,"secreat",{expiresIn:"20s"});
            
            res.json({"tocken":tocken});
         }
        }
        
    }
    catch{
        res.status(500).send("Provide correct credentials");
    }

}

var auth=(req,res,next)=>{
   
    const head=req.headers['authorization']
    if(!head){
        res.status(500).send("no autherization")
    }
    const tocken=head.split(" ")[1];
    jwt.verify(tocken,"secreat",(err,data)=>{
        if(err){ res.status(500).send("no access session expired")};
        console.log("autherized");
        req.user=data;//Store the verified user data in the request object for further use if needed
        next();
    })
}


module.exports={signup, login,users,auth}