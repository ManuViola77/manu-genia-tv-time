import React from "react";
import { Link } from "react-router-dom";
import tvTimeLogo from "assets/tvTimeLogo.jpg";
import "./pages-style.css";

function LandingPage() {
  return (
    <div className="App-center-container">
      <img src={tvTimeLogo} className="App-logo" alt="logo" />
      <p>Esta es la super web page de Manu Genia</p>

      <Link className="App-link" to="/home">
        Enter Web (or don't, it's a trap!)
      </Link>
    </div>
  );
}

export default LandingPage;
