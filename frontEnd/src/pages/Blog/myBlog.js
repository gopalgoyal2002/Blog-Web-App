import React from 'react'
import BlogCard from '../../components/blog/blogCard'
import Navbar from '../../components/navbar/Navbar'
import { useState,useEffect } from 'react'
import { userBlogs,deleteBlog } from '../../helper/blog'
import {Link} from 'react-router-dom'
import Footer from '../../components/footer/footer'
export default function MyBlog() {
  const [result, setResult] = useState([]);
  const [refresh,setRefresh]=useState(false)

useEffect(()=>{
  
  const userInfo=localStorage.getItem('user-info')
  const userId=JSON.parse(userInfo).user._id
  userBlogs(userId).then(res=>{
     setResult(res.data)
    }).catch(err=>{
      console.log(err)
    })
    // console.log(result)

},[refresh])

const handleDelete=(blogId)=>{
  // console.log(props.blogId)
  // console.log("delete")
    deleteBlog(blogId).then(res=>{
      console.log(res)

      if(refresh===false)
      setRefresh(true)
      else
      setRefresh(false)

    }).catch((err)=>{
      console.log(err)
    })
  }

// console.log(result)

  return (
    <>
    <Navbar/>
    <div className='container'>
      <h2>My Blogs</h2>
    {result.map((e)=>{
      return(
      <div className='blog'>
       <BlogCard blogId={e._id} key={e._id} title={e.title} maintext={e.text} auther={e.auther}/>
       {/* <button onClick={()=>handleEdit(e._id)}></button> */}
       <br></br>
       <button onClick={()=>handleDelete(e._id)}>Delete Blog</button>

       <Link to={`/writeblog/${e._id}`} className="current">Edit Blog</Link>
       
       </div>
      )
    })}

    </div>
    <Footer/>
    </>
  )
}
