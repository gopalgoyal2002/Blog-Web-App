import React, { useState } from "react";
import './signup.css'
import { signUpCall } from "../../helper/user";
import Header from "../../components/header/Header";
import { Alert } from "@mui/material";
import Footer from "../../components/footer/footer";
// import {userState} from 'react'
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(2);
  const [error, setError] = useState("");
  
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(email,password,name)
    const data = { name, email, password };

    signUpCall(data).then((result) => {
      if (result.satus === 0) {
        console.log("error");
        setError(result.message);
        setStatus(result.status);
      } else {
        setError(result.message);
        setStatus(result.status);
      }
    });
  }

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="form-box login">
          <h2>Registration</h2>
          <div className="main">
            <form>
            <div className="input-box">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              <label>
                Username</label>
              </div>
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
                Signup  
              </button>
              </div>
              <div className="login-register">
                <p>Already have an accout? 
                  <a href='/signin' className="register-link"> Login</a>
                </p>
              </div>
            </form>
          </div>

          {status === 0 && <Alert severity="error">{error}</Alert>}
          {status === 1 && <Alert severity="success">{error}</Alert>}

        </div>
      </div>
      <Footer/>
    </>
  );
}
