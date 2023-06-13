const mongoose=require('mongoose')
const express=require('express')
mongoose.connect('mongodb://localhost/authTest').then((res)=>{
console.log("db connected successfully")
}).catch((er)=>{
    console.log(er)
})

const app=express();
app.use(express.json())