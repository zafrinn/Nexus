import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login-signup.css";
import logo from "../../assets/logo.png";
import slogan from "../../assets/slogan.png";
import ReCAPTCHA from "react-google-recaptcha";
import { resetPassword } from "../../apiHelpers";

const PasswordReset = () => {
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
      };
      let json = JSON.stringify(formData);
      const { success, message } = await resetPassword(json);

      if (success) {
        alert("Password reset instructions sent successfully!");
        navigate("/");
      } else {
        alert(message);
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
          <div className="heading-container">Password Reset</div>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
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
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleCaptchaChange}
              />
              <div>
                <button type="submit" className="submit-btn">
                  Reset Password
                </button>
              </div>
            </form>
            <div id="account">
              <p>Remember your password?&nbsp;</p>
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

export default PasswordReset;
