import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import tvTimeLogo from "assets/tvTimeLogo.jpg";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <div className="App-header">
        <img src={tvTimeLogo} className="App-logo" alt="logo" />
        <p>Esta es la super web page de Manu Genia</p>

        <Link className="App-link" to="/users">
          Enter Web (or don't, it's a trap!)
        </Link>
      </div>
    </>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
