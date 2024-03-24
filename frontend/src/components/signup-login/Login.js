import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login-signup.css";
import logo from "../../assets/logo.png";
import slogan from "../../assets/slogan.png"
import ReCAPTCHA from 'react-google-recaptcha';

const LoginPage = (userId, setUserId ) => {
    
  //const navigate = useNavigate();
  const [captchaValue, setCaptchaValue] = useState(null);
    
  const handleCaptchaChange = (value) => {
    console.log('Captcha value:', value);
    setCaptchaValue(value);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    // Validate captchaValue and submit form if valid
    if (captchaValue) {
      console.log('Form submitted with captcha value:', captchaValue);
      // Submit your signup form here
    } else {
      console.log('Please complete the CAPTCHA');
    };

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (captchaValue) {
      console.log('Form submitted with captcha value:', captchaValue);
      
      const formData = {
        username: e.target.username.value,
        password: e.target.Password.value,
      };
      console.log(formData);
  
      const response = await fetch("/api/login", {
        method: "POST",
        dataType: "json",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
  
      if (responseData.message === "User Logged In successfully") {
        console.log(responseData.user_info.userId);
        setUserId(responseData.user_info.userId);
        sessionStorage.setItem("userId", responseData.user_info.userId);
        //navigate("/landing");
      } else if (
        responseData.message === "User does not exist or Incorrect Password"
      ) {
        alert("User does not exist or Incorrect Password");
      } else {
        console.log("Email already in use");
      }


    } else {
      console.log('Please complete the CAPTCHA');
      alert('Please complete the CAPTCHA');
    };
  }; 
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6" id="left-container"> 
          <img id="logo" src={logo} alt="Logo" className="img-fluid" />
          <img id="slogan" src={slogan} alt="Slogan" className="img-fluid" />
        </div>
        <div className ="col-md-6" id="right-container">
          <div className="heading-container">Sign In</div>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="input">
                <label className="label">Email Address</label>
                <input
                  className="input"
                  type="email"
                  name="username"
                  placeholder="example@torontomu.ca"
                  required
                />
              </div>
              <div className="input">
                <label className="label">Password</label>
                <input
                  id="password"
                  className="input"
                  type="password"
                  name="Password"
                  placeholder="***********"
                  required
                />
                
                <a href="/" id="forgotpass-instructions">
                    <p id="forgotpass-instructions">Forgot your password</p>
                </a>
              </div>
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleCaptchaChange}
              />
              <div>
                <button type="submit" className="submit-btn">
                  Sign Up
                </button>
              </div>
            </form>
            <div id="account">
              <p>Don't have an account?&nbsp;</p>
              <a href="/">
                <i>Sign up</i>
              </a>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default LoginPage;
