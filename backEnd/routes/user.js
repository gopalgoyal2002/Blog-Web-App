const express=require('express')
const router=express.Router()
const {signup,signin,signout,dummy,varifyToken, isLogin} = require('../controllers/user')

const {check} =require("express-validator")

router.post('/signup',[
    check("name","name at least should be 3 character").isLength({min:3}),
    check("email","email should be valid").isEmail(),
    check("password","password at least should be six character").isLength({min:6}),
],signup)
router.post('/signin',[
    check("email","email should be valid").isEmail(),
    check("password","password at least should be six character").isLength({min:6}),
],signin)
router.get('/signout',signout)
router.get('/checklogin',isLogin)


router.get('/dummy',dummy)



module.exports=router