import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { updataBlog,BlogById } from "../../helper/blog";
import {  useParams } from "react-router-dom";
import Footer from "../../components/footer/footer";
import "./writeBlog.css"
import { Alert } from "@mui/material";

export default function UpdateBlog(props) {

  const [text, setText] = useState();
  const [title, setTitle] = useState();
  const [auther, setAuther] = useState();
  const [status, setStatus] = useState(2);
  const [msg,setMsg]=useState("")
  const { blogId } = useParams()

  useEffect(()=>{
    console.log(blogId)
    BlogById(blogId).then((res)=>{
        setText(res.blog.text)
        setAuther(res.blog.auther)
        setTitle(res.blog.title)
    }).catch((err)=>{
      console.log(err)
    })
  },[blogId])

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const id=blogId
    const item = { text, title, auther, id };
    // console.log(text, title, auther);
    // console.log(item)
    updataBlog(item)
      .then((res) => {
        console.log(res);
        setStatus(res.status)
        setMsg(res.message)
      })
      .catch((err) => {
        setStatus(0)
        setMsg("Error occured")
        console.log(err);
      });
    // console.log("Blog Updated");
  };

  return (
    <>
      <Navbar />
      
      <div className="wrapper-blog">
        <div className="blog-form write">
        <h2>Edit your blog</h2>
        <form action="POST">
          <div className="input">
          <label>
            Title:
          </label>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              name="title"
              value={title}
            />
            
          </div >
          <div className="input">
          <label>
            Auther:
          </label>
            <input
              type="text"
              onChange={(e) => {
                setAuther(e.target.value);
              }}
              name="title"
              value={auther}
            />
          
          </div>
          <div className="input">
          <label>
            Write you blog here:
          </label>
            <textarea className="maintext"
              type="text"
              onChange={(e) => {
                setText(e.target.value);
              }}
              name="title"
              value={text}
            />
            
          </div>
          <div className="button">
          <button className="btn" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
        
     
      {status === 0 && <Alert severity="error">{msg}</Alert>}
      {status === 1 && <Alert severity="success">{msg}</Alert>}
 </div>
      </div>

      <Footer/>
    </>
  );
}
