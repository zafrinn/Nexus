import React from 'react';
import './App.css';
import SignupPage from './components/signup-login/Signup.js';
import LoginPage from './components/signup-login/Login.js';
import Navbar from './components/navbar/Navbar.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route
            path='/'
          />
      </Routes>
    </Router>
      
   
  );
}

export default App;
