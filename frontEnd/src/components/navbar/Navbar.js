import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom'
import {checkLogin, signOutCall} from '../../helper/user'
import './navbar.css'
export default function Navbar() {
    const[login,setLogin]=useState(false)
    
    useEffect(()=>{
        checkLogin().then(res=>{
            if(res.status===1){
            setLogin(true)
            }
          }).catch(err=>{
            setLogin(false)
            
          })

    },[])

   function logout(){ 
       return  signOutCall().then(result=>{
            if(result.error){
                console.log(result.error)
            }else{
                console.log(result)
                localStorage.removeItem("user-info");
                setLogin(false);
            }
        })
      };

  return (
    <>
    <header className='header'>
    <h2 className='logo'>IITB Blogs</h2>
    <nav className='navigation'>
        <a  href="/">Home </a>
       
         {/* <a  href="/aboutus">About</a>
         <a  href="/contact">Contact</a> */}
         { login === true &&(
       
       <a href="/myblogs">My Blogs</a>
        )
        }
        { login === true &&(
            <a  href="/writeblog">Write Blog</a>
         )
        }
        { login===false &&  
            <a  href="/signin">Login</a>
        }
        { login===false &&  
            <a  href="/signup">signup</a>
    
        }
        { login === true &&(
            <button className='btn-popup' onClick={()=>logout()} href="/">signout</button>
         )
        }
    
    </nav>
  
    </header>
</>
  )
}
