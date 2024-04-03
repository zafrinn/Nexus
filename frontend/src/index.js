import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./components/signup-login/Signup.js";
import LoginPage from "./components/signup-login/Login.js";
import PasswordReset from "./components/signup-login/PasswordReset.js";
import Navbar from "./components/Navbar/Navbar.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import HomePage from "./components/Home/Home.js";
import MessagesPage from "./components/Messages/messages.js";
import PostAdsPage from "./components/PostsAds/PostAds.js";
import ServicesPage from "./components/Services/services.js";
import ReactDOM from "react-dom";
import "./index.css";

export const pages = {
  home: "/home",
  dashboard: "/dashboard",
  postAds: "/post",
  services: "/services",
  messages: "/messages",
};

function Pages({ userId, setUserId }) {
  const [page, setPage] = useState(pages.landing);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="screen">
      <Navbar page={page} setPage={setPage} setShowLogout={setShowLogout} />

      <main className="content">
        <Routes>
          <Route
            path={pages.dashboard}
            element={<Dashboard userId={userId} setUserId={setUserId} />}
          />
          <Route
            path={pages.home}
            element={<HomePage userId={userId} setUserId={setUserId} />}
          />
          <Route
            path={pages.postAds}
            element={<PostAdsPage userId={userId} setUserId={setUserId} />}
          />
          <Route
            path={pages.services}
            element={<ServicesPage userId={userId} setUserId={setUserId} />}
          />
          <Route
            path={pages.messages}
            element={<MessagesPage userId={userId} setUserId={setUserId} />}
          />
        </Routes>
      </main>
    </div>
  );
}

function AppRouter() {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage user={userId} setUserId={setUserId} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route
          path="*"
          element={<Pages userId={userId} setUserId={setUserId} />}
        />
      </Routes>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById("root")
);
