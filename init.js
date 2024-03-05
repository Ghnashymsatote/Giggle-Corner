const mongoose = require('mongoose');
const Sign=require("./model/sign");
main().then((res)=>{
    console.log("connection successfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/NEWJOKES');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
Sign.insertMany({});