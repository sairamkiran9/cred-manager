import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Login from "./components/loginPage";
import Registration from "./components/registrationPage";
import Home from "./components/homePage";
import Test from "./test";
import SaveCredentials from "./components/saveCredsPage";
import ViewCreds from "./components/viewCreds";
import Url from "./components/testUrl";

function App() {
  const { url } = useParams();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="data" element={<Test />} />
          <Route path="logins" element={<Login />} />
          <Route path="registers" element={<Registration />} />
          <Route path="home" element={<Home />} />
          <Route path="/savecreds" element={<SaveCredentials />} />
          <Route path="viewcreds" element={<ViewCreds />} />
          <Route path="*" element={<div>404 NOT FOUND</div>} />
          <Route path="/url/:url" element={<Url />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
