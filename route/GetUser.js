const express=require("express");
const app=express();
const gete=(req,res,next)=>{
    res.json(req.user);

}
module.exports={gete}