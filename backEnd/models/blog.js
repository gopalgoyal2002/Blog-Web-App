const mongoose=require("mongoose")
const { stringify } = require("uuid")
const { ObjectId } = mongoose.Schema;
const blogSchema= new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
    },
    auther:{
        type:String,
        maxLength:32,
        trim:true
    },
    text:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    image:
    {
        data: Buffer,
        contentType: String
    }
},{timestamps:true})

module.exports=mongoose.model("Blog",blogSchema)