import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "pages/HomePage";
import LandingPage from "pages/LandingPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-header">
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
