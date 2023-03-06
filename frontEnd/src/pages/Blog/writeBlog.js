import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { writeBlog } from "../../helper/blog";
import Footer from "../../components/footer/footer";
import "./writeBlog.css"
import { Alert } from "@mui/material";

export default function WriteBlog() {
  const userInfo = localStorage.getItem("user-info");
  const userId = JSON.parse(userInfo).user._id;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [auther, setAuther] = useState("");
  const [status, setStatus] = useState(2);
  const [msg, setMsg] = useState(false);

 
  const handleSubmit = (event) => {
    event.preventDefault();

    const item = { text, title, auther, userId };
    console.log(text, title, auther);
    writeBlog(item)
      .then((res) => {
        setStatus(res.status);
        setMsg(res.message)
        console.log(res.message)
        console.log(res);
      })
      .catch((err) => {
        setStatus(0);
        setMsg("Error occured")
        console.log(err);
      });
    console.log("Blog Submitted");
  };

  return (
    <>
      <Navbar />
      
      <div className="wrapper-blog">
        <div className="blog-form write">
        <h2>Write a new blog</h2>
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
