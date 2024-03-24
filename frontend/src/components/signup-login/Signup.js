import React from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login-signup.css";
import logo from "../../assets/logo.png";
import slogan from "../../assets/slogan.png"
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';


const SignupPage = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    console.log('Captcha value:', value);
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate captchaValue and submit form if valid
    if (captchaValue) {
      console.log('Form submitted with captcha value:', captchaValue);
      // Submit your signup form here
    } else {
      console.log('Please complete the CAPTCHA');
    }
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6" id="left-container"> 
          <img id="logo" src={logo} alt="Logo" className="img-fluid" />
          <img id="slogan" src={slogan} alt="Slogan" className="img-fluid" />

        </div>
        <div className ="col-md-6" id="right-container">
        <div className="heading-container">Create Account</div>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="input">
                <label className="label">First Name</label>
                <input
                  className="input"
                  type="text"
                  name="Fname"
                  placeholder="Jane"
                  required
                />
              </div>
              <div className="input">
                <label className="label">Last Name</label>
                <input
                  className="input"
                  type="text"
                  name="Lname"
                  placeholder="Doe"
                  required
                />
              </div>

            

              <div className="input2">
                <label className="label">Email Address</label>
                <input
                  className="input"
                  type="email"
                  name="username"
                  placeholder="example@torontomu.ca"
                  required
                />
              </div>
              <div className="input2">
                <label className="label">Password</label>
                <input
                  id="password"
                  className="input"
                  type="password"
                  name="Password"
                  placeholder="***********"
                  required
                />
                <p id="pass-instructions">Use 8 or more characters with a mix of letters, numbers & symbols</p>
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
              <p>Already have an account?&nbsp;</p>
            </div>
            
          </div>
        </div>
      </div>  
    </div>
  );
};

export default SignupPage;
