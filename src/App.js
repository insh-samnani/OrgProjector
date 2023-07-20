import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// import Footer from './Components/Footer';
import Navbar from './Components/Navbar'
import Alert from './Components/Alert';
import Home from './Components/Home';
import Login from './Components/Login';
import OrganizationDetail from './Components/OrganizationDetail';
import OrganizationHome from './Components/OrganizationHome';

import OrganizationState from "./Context/Organizations/organizationState";
import ProjectState from "./Context/Projects/projectState";

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
      <OrganizationState>
        <ProjectState>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/organizationhome" element={<OrganizationHome showAlert={showAlert}/>} />
              <Route exact path="/organizationDetail/:id" element={<OrganizationDetail showAlert={showAlert}/>} />
            </Routes>
          </div>
        </ProjectState>
      </OrganizationState>
      {/* <Footer title="Insha Samnani - BSCS (FAST-NUCES)" /> */}
    </Router>
  );
}

export default App;
