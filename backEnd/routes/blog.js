const express= require("express")
const {addBlog,findBlogById,deleteBlog,updateBlog,getallBlog,getAllUserBlog}=require('../controllers/blog')
const {varifyToken} = require('../controllers/user')
router=express.Router()

router.post('/addblog',varifyToken,addBlog)
router.delete('/deleteblog/:blogId',varifyToken,deleteBlog)
router.put('/updateblog',varifyToken,updateBlog)
router.get('/getallblogs',getallBlog)
router.get('/getuserblogs/:userId',varifyToken,getAllUserBlog)
router.get('/getblog/:blogId',varifyToken,findBlogById)





module.exports=router