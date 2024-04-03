import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login-signup.css";
import logo from "../../assets/logo.png";
import slogan from "../../assets/slogan.png";
import ReCAPTCHA from "react-google-recaptcha";
import { loginUser } from "../../apiHelpers";

const LoginPage = ({ setUserId }) => {
  const navigate = useNavigate();
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captchaValue) {
      console.log("Form submitted with captcha value:", captchaValue);

      const formData = {
        username: e.target.username.value,
        password: e.target.Password.value,
      };

      try {
        let json = JSON.stringify(formData);
        const { success, message } = await loginUser(json);
        if (success) {
          navigate("/home");
        } else {
          alert(message);
        }
      } catch (error) {}
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
                  <NavLink to="/password-reset">
                    <p id="forgotpass-instructions">Forgot your password</p>
                  </NavLink>
                </a>
              </div>
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleCaptchaChange}
              />
              <div>
                <button type="submit" className="submit-btn">
                  Sign In
                </button>
              </div>
            </form>
            <div id="account">
              <p>Don't have an account yet?&nbsp;</p>
              <NavLink to="/signup">
                <p style={{ marginTop: "3px", fontStyle: "italic" }}>Sign Up</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
