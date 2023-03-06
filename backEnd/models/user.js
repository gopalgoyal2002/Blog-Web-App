const mongoose=require('mongoose')
const { stringify } = require('uuid')
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxLength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    encry_password:{
        type:String,
        required:true
    },
    salt:String,
},{timestamps:true})

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt= uuidv4()
        this.encry_password=this.securePassword(password)

    })
    .get(function(){
        return this._password
    })

userSchema.methods={
    authenticate:(plainpassword,encry_password)=>{
        return userSchema.methods.securePassword(plainpassword) == encry_password
    },
    securePassword:(plainpassword)=>{
        if(!plainpassword) return "";
        try{
            // console.log(plainpassword)
            return crypto.createHmac("sha256",String(this.salt)).update(plainpassword).digest("hex");

        }
        catch(err){
            // console.log(err)
            return ""
        }
    }
}

module.exports=mongoose.model("User",userSchema)