import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login-signup.css";
import logo from "../../assets/logo.png";
import slogan from "../../assets/slogan.png";
import ReCAPTCHA from "react-google-recaptcha";

const SignupPage = () => {
  const navigate = useNavigate();
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate captchaValue and submit form if valid
    if (captchaValue) {
      console.log("Form submitted with captcha value:", captchaValue);
      const formData = {
        displayName: e.target.username.value,
        emailAddress: e.target.email.value,
        password1: e.target.Password.value,
        password2: e.target.Password.value,
      };
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/external/user/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          alert("User created successfully!");
          navigate("/");
        } else {
          alert("Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    } else {
      console.log("Please complete the CAPTCHA");
      alert("Please complete the CAPTCHA");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6" id="left-container">
          <img id="logo" src={logo} alt="Logo" className="img-fluid" />
          <img id="slogan" src={slogan} alt="Slogan" className="img-fluid" />
        </div>
        <div className="col-md-6" id="right-container">
          <div className="heading-container">Create Account</div>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="input">
                <label className="label">Username</label>
                <input
                  className="input"
                  type="text"
                  name="username"
                  placeholder="johndoe77"
                  required
                />
              </div>

              <div className="input2">
                <label className="label">Email Address</label>
                <input
                  className="input"
                  type="email"
                  name="email"
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
                <p id="pass-instructions">
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </p>
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
              <NavLink to="/">
                <p style={{ marginTop: "3px", fontStyle: "italic" }}>Sign In</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
