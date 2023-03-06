const User=require("../models/user")
const {validationResult}= require("express-validator")
const jwt=require('jsonwebtoken')
var expressJwt=require("express-jwt")
const signup=(req,res)=>{
    // console.log("attemp Signup")
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            status:0,
            message:errors.array()[0].msg
        })
    }

    const user= new User(req.body)
    // console.log(user)
    user.save((error,user)=>{
        if(error){
            console.log(error)
            return res.status(400).json({
                status:0,
                message:"Unable to signup"
            })
        }
        return res.json({
            status:1,
            message:"Successfully signup",
            user
        })
    })
}
const signin=(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            message:errors.array()[0].msg,
            status:0
        })
    }

    const {email,password}=req.body
    User.findOne({email},(err,user)=>{
        // console.log(user.encry_password)
        if(err || !user){
            return res.status(400).json({
                message:"Email not found",
                status:0
            })
        }
        //authenticate the user
        if(!user.authenticate(password,user.encry_password)){
            return res.status(400).json({
                message:"Email and Password do not match",
                status:0
            })
        }
        //create a token
        const token=jwt.sign({_id:user._id},process.env.SECRET)
        //put token into cookie
        // res.cookie('token',token,{ httpOnly: true },{expire:new Date()+1})
        res.cookie('token', token, { httpOnly: true });
        // res.json({ token });
        //send the response
        const {_id,name,email} =user
        return res.json({
            user:{
                _id,name,email
            },
            status:1
        })

    })
}
const signout=(req,res)=>{
    // console.log(req.cookies.token)
    res.clearCookie("token")
    return res.json({
        message:"User siginout successful",
        status:1
    })
  
}
const dummy=(req,res)=>{
    // console.log(req.cookies.token)
    return res.json({
       a: "sdf"
    })
}
const varifyToken=(req,res,next)=>{
    
    const token2=req.cookies.token
    // console.log(token2)
    // console.log(token1)
// console.log(token1)
    // const bearereHeader=req.headers['authorization']
    // console.log(bearereHeader)
    // if(typeof bearereHeader !=='undefined'){
    if(token2){
        // const bearer=bearereHeader.split(" ");
        // const token=bearer[1]
        // console.log(token)
        req.token=token2;
        jwt.verify(token2,process.env.SECRET,(err,authData)=>{
            if(err){
                // console.log("sdfsdfsd")
               return res.status(400).json({message:"Invalid Token"})
            }
        })
    }
    else{
        return res.status(400).json(({
            message:"Token is not valid"
        }))
    }
    next()
}
const isLogin=(req,res)=>{
    // console.log(req)
    const token1=req.cookies.token
    // console.log(token1)
    // console.log("mkm")

    if(token1){
        req.token=token1;
        jwt.verify(token1,process.env.SECRET,(err,authData)=>{
            if(err){
               return res.status(400).json({
                message:"User Not Login",
                status:0
                })
            }
            else{
                return res.status(200).json(({
                    message:"User Loged in",
                    status:1
                }))
            }
        })
    }
    else{
        return res.status(200).json(({
            message:"User Not Login",
            status:0
        }))
    }

    
}

module.exports={signup,signin,signout,dummy,varifyToken,isLogin}