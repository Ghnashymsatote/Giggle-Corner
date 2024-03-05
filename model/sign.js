const mongoose = require('mongoose');
const SignSchema=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})
const Sign=mongoose.model("Sign",SignSchema);
module.exports=Sign;