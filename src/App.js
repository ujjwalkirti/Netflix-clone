import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard";
require("dotenv").config();

function App() {
  return (
  <Router>  
    <div className="app">
      <Switch>
        <Route exact path="/catalogue">
          <HomeScreen />
        </Route>
        <Route path="/login">
          <LoginScreen/>
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
