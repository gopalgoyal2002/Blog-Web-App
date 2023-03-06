import React, { useEffect, useState } from "react";
import './signin.css'
import { checkLogin, signInCall } from "../../helper/user";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import {Alert} from '@mui/material'
import Footer from "../../components/footer/footer";
// import {userState} from 'react'
export default function SignUp() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(2);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(email,password,name)
    const data = { email, password };

    signInCall(data).then((result) => {
      if (result.status === 0) {
        setStatus(result.status);
        setError(result.message);
      } else {
        localStorage.setItem("user-info", JSON.stringify(result));
        setStatus(result.status);
        console.log(result);
        setError("successfully Login");
        // navigate('/');
      }
    });
  }

  const navigate = useNavigate();
  useEffect(() => {
    checkLogin().then((res) => {
      console.log(res);
      if (res.status === 1) navigate("/");
    });
  });

  return (
    <>
      <Header />
      <div className="wrapper">
       
        <div className="form-box login">
          <h2>Login</h2>
          <div className="main">
            <form>
              <div className="input-box">
                <input
                  type="emial"
                  name="email"
                  
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              <label>
                Email</label>
              </div>
              <div className="input-box">
              <input
                type="password"
                id="psw"
                name="psw"
                //  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                //  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"

                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label required>Password</label>

              </div>
              <div className="button">
              <button type="submit" onClick={handleSubmit} className="btn">
                Login  
              </button>
              </div>
              <div className="login-register">
                <p>Don't have an accout? 
                  <a href='/signup' className="register-link"> Register</a>
                </p>
              
              </div>
            </form>
          </div>
          {status === 0 && <Alert severity="error">{error}</Alert>}
        </div>
      </div>
      <Footer/>
    </>
  );
}
