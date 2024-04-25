const express=require("express")
const app=express();
const {signup,login,auth}=require("./authentication/auth");
const {gete}=require("./route/GetUser")
    
app.use(express.json());
app.post("/signup",signup,(req,res)=>{
    console.log("account created");
})

app.post("/login",login,(req,res)=>{
})

app.get("/user",auth,gete,(req,res)=>{
})

app.listen(8080,()=>{
    console.log("server listening");
});