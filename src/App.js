import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from './Components/Navbar'
import Alert from './Components/Alert';
import Home from './Components/Home';
import Login from './Components/Login';
import OrganizationHome from './Components/OrganizationHome';

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <Router>
      <Navbar />
      <Alert alert={alert}/>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/organizationhome" element={<OrganizationHome showAlert={showAlert}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
