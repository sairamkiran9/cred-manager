import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Login from "./components/loginPage";
import Registration from "./components/registrationPage";
import Home from "./components/homePage";
import Test from "./test";
import SaveCredentials from "./components/saveCredsPage";
import ViewCreds from "./components/viewCreds";
import Url from "./components/testUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetUrlCreds from "./components/getCredsByUrl";
import OTPVerification from "./components/otp";

function App() {
  const { url } = useParams();

  return (
    <div className="App">
      <ToastContainer />
      {<OTPVerification />}
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="data" element={<Test />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="home" element={<Home />} />
          <Route path="savecreds" element={<SaveCredentials />} />
          <Route path="viewcreds" element={<ViewCreds />} />
          <Route path="geturlcreds" element={<GetUrlCreds />} />
          <Route path="*" element={<div>404 NOT FOUND</div>} />
          <Route path="/url/:url" element={<Url />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
