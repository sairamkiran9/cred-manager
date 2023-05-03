import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/loginPage";
import Registration from "./components/registrationPage";
import Home from "./components/homePage";
import Test from "./test";
import SaveCredentials from "./components/saveCredsPage";
import ViewCreds from "./components/viewCreds";
import Url from "./components/testUrl";
import OTPVerification from "./components/otp";
import Notify from './components/notify';

function App() {
  return (
    <div className="App">
      {<Notify />}
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="data" element={<Test />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="home" element={<Home />} />
          <Route path="savecreds" element={<SaveCredentials />} />
          <Route path="viewcreds" element={<ViewCreds />} />
          <Route path="otp" element={<OTPVerification />} />
          <Route path="*" element={<div>404 NOT FOUND</div>} />
          <Route path="/url/:url" element={<Url />} />
          {/* <Route path="/sharecreds" element={<ShareCreds />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;