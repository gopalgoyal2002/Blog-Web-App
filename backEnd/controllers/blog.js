const Blog=require('../models/blog')
const User=require('../models/user')
const fs=require("fs")
const multer=require("multer")
const MongoClient = require("mongodb").MongoClient

const client = new MongoClient(process.env.DATABASE);
const Storage= multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
const upload=multer({
    storage:Storage
}).single('image')

const addBlog=(req,res)=>{
  //  console.log(req.body)
    // upload(req,res,(err)=>{
    //     if(err){
    //         console.log(err);
    //         return res.status(400).json("Error")
    //     }
    //     else{
    //         // console.log(req.body)
            User.findById(req.body.userId)
            .exec((err,user)=>{
                if(err){
                    return res.status(400).json({
                        message:"NO user in DB",
                        status:0
                    });
                };
                req.user=user;
                
                const newBlog= new Blog({
                  text:req.body.text,
                  user:req.user,
                  title:req.body.title,
                  auther:req.body.auther
              })
              // console.log(newBlog)

              newBlog.save().then(()=>
              res.status(200).json({message:'Successfully Uploaded',
              status:1}))
              .catch((err)=>{console.log(err)
              return res.status(400).json({status:0,
                message:"Required Field Missing"}) } )
            })
          
        }
        
    // })
// }

const deleteBlog=(req,res)=>{
  // console.log(req.params.blogId)
  Blog.findByIdAndDelete(req.params.blogId, (err, doc)=>{
    // console.log(doc)
    if(!doc){
      return res.json({message:"Blog not Found", status:0})
    }
    if (!err) {
     return res.json({message:"successfull deleted",status:1})
  } else {
      console.log(err)
      return res.json({message:"Error Found",status:0})
  }
  })
// return res.json("sdf")
}

const findBlogById=(req,res)=>{
  // console.log("sdf")
  // console.log(req.params.blogId)
  Blog.findById(req.params.blogId, (err, doc)=>{
    // console.log(doc)
    if(!doc){
      return res.json({message:"Blog not Found",status:0})
    }
    if (!err) {
     return res.json({message:"Blog Found",status:1
    ,blog:doc})
  } else {
      console.log(err)
      return res.json({message:"Error Found",status:0})
  }
  })
// return res.json("sdf")
}

const updateBlog=(req,res)=>{
  // console.log(req.body)
  Blog.findByIdAndUpdate(req.body.id,
    {text:req.body.text,title:req.body.title,auther:req.body.auther}).then(()=>{
    res.status(200).json({message:"successfully updated",status:1})
  }).catch((err)=>{
    console.log(err);
    res.status(400).json({message:"Error Occure",status:0})
  })
}

const getallBlog=(req,res)=>{

  Blog.find().exec((err,blogs)=>{
    if(err){
      res.status(400).json({
        Error:"error"
      })
    }
    return res.status(200).json({
      data:blogs
    })
  });  
}

const getAllUserBlog=(req,res)=>{
 
  const query = { user:req.params.userId};
  // console.log(req.params.userId)
  // const query={text:"RealBlog"}
  // console.log(req.body.userId)

  Blog.find(query).exec((err,blogs)=>{
    if(err){
      res.status(400).json({
        Error:"error"
      })
    }
    return res.status(200).json({
      data:blogs
    })
  });


}
module.exports={addBlog,findBlogById
  ,deleteBlog,updateBlog,
  getallBlog,getAllUserBlog}