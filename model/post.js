const mongoose = require('mongoose');
const PostSchema=new mongoose.Schema({
    Post:{
        type:String
    }
})
const Post=mongoose.model("Post",PostSchema);
module.exports=Post;