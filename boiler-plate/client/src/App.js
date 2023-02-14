import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        {/*
          강의를 보면 <Routes> 부분에 <Switch>를 쓰고
          <element>를 <component>로 쓰고
          {<LandingPage/>} 를 {LandingPage}로 썼지만 
          버전 업데이트로 인해 조금 달라서 강의 그대로 하면 
          에러가뜬다.
        */}
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/register" element={<RegisterPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

