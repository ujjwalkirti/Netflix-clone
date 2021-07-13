import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard";
import { auth } from "./Firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import PayForPlans from "./components/PayForPlans";
require("dotenv").config();

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = () => {
      auth.onAuthStateChanged(function (authUser) {
        if (authUser) {
          console.log(authUser);
          dispatch(
            login({
              uid: authUser.uid,
              email: authUser.email,
            })
          );
        } else {
          dispatch(logout());
          console.log("LOGGED OUT");
        }
      });
    };
    unsubscribe();
  }, [dispatch]);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <LoginScreen />
          </Route>
          <Route exact path="/catalogue">
            <HomeScreen />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/plans/premium">
            <PayForPlans typeOfPlan="Premium" />
          </Route>
          <Route exact path="/plans/standard">
            <PayForPlans typeOfPlan="Standard" />
          </Route>
          <Route exact path="/plans/basic">
            <PayForPlans typeOfPlan="Basic" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
