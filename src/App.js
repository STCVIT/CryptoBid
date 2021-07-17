import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import Header from "./components/Navbar";
import Main from "./components/Main";
import Loginpg from "./components/Login";
import React from "react";
import "./components/styles.css";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  const Data = {
    Name: "Mohit ",
  };
  const logged = false;
  
  return (
    !logged ? 
    <Router>
    <div>
      <Loginpg />
    </div> 
    </Router>: <Router>
      <div className="App">
        <div className="d-flex container-fluid">
          <div className="flex-fill sidebar">
            <Header />
          </div>
          <div className="flex-fill col-sm-12 main">
            <Main Data={Data} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
