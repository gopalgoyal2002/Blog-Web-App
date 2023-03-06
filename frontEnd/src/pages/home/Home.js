import React,{useEffect,useState} from 'react'
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
// import { dummy } from '../../helper/user'
import BlogCard from '../../components/blog/blogCard';
import { allBlogs } from '../../helper/blog'
import './home.css'
function Home() {
  const [result, setResult] = useState([]);
  
  useEffect(()=>{

  allBlogs().then(res=>{
    // console.log(res)
     setResult(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  return (
    <>
     <Header/>
     <div className='container'>
      <h2>Blogs</h2>
        {result.map((e)=>{
          return(
          <div className='blog'>
          <BlogCard blogId={e._id} key={e._id} title={e.title} maintext={e.text} auther={e.auther}/>
          </div>
          )
        })}
        </div>
      <Footer/>
    </>
  )
}

export default Home;