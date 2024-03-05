const express=require("express");
const app=express();
const path=require("path");
const mongoose = require('mongoose');
const Sign=require("./model/sign");
const Post=require("./model/post.js");
const methodOverride=require("method-override");
app.set("views",path.join(__dirname,"views"));
app.set("view path",path.join(__dirname,"views")); 
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public"))); 
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then((res)=>{
    console.log("connection successfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/NEWJOKES');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.get("/signup",(req,res)=>{
   res.render("sign.ejs");
})
app.post("/signup/home",async(req,res)=>{
   let {Username,email,password}=req.body;
    let Data=new Sign({
        Username:Username,
        email:email,
        Password:password
        
    });
    Data.save().then((dt)=>{
        console.log("data SAved");
    }).catch((err)=>{
        console.log(err);
    });
    let User=await Sign.find({Username:Data.Username});
   
 if(User.length > 1){
    console.log("try Another");
    delUser=await Sign.findByIdAndDelete(Data._id);
    res.redirect("/signup");
 }else{
    let newOne=User;
    let Onetwo=await Post.find();
    res.render("home.ejs",{newOne,Onetwo});
 }
      
});
app.get("/login",(req,res)=>{
    res.render("login.ejs");
})  
app.post("/login/home",async(req,res)=>{
  let { username,password}=req.body;
  let newOne=await Sign.find({Username:username});
  let pass=await Sign.find({Password:password});
  let Onetwo=await Post.find();
    if(newOne){
        if(pass){
            res.render("home.ejs",{newOne,Onetwo})
        }else{
            console.log("Not found")
            res.redirect("/login");
            return;
        }
    }else{
        console.log("not found");
        res.redirect("/login");
        
    }
});
app.get("/login/home/:id/profile",async(req,res)=>{
    let {id}=req.params;
    let ProfileId=await Sign.findById(id);
    res.render("profile.ejs",{ProfileId});
});
app.post("/login/home/:id",async(req,res)=>{
    let {id} = req.params;
    let newOne = await Sign.find({_id:id});
    let {textMsg}=req.body;
    let Data2=new Post({
        Post:textMsg
    }); 
    Data2.save().then((dt)=>{
        console.log("Post saved");
    }).catch((err)=>{
        console.log(err);
    });
    let Onetwo=await Post.find();
    res.render("home.ejs",{newOne,Onetwo}); 
})

app.delete("/:id/:user",async(req,res)=>{
    try{
       
        let {id,user} = req.params;
        let newOne = await Sign.find({_id:user});
        console.log(user);
        console.log(id);
        let del = await Post.findByIdAndDelete(id);
        console.log(del);


          let Onetwo=await Post.find();
            res.render("home.ejs",{newOne,Onetwo}); 
        // console.log(del);
       
    }catch(e){
        console.log(e);
    }
    
    

})

app.listen(8080,()=>{
    console.log("listening port on 8080");
})