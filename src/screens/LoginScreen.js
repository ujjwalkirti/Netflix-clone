import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Nav from "../components/Nav";
import "./LoginScreen.css";

import backgroundImage from "../Static/netflix-background-9.webp";
import LoginCenterContent from "./LoginCenterContent";

function LoginScreen() {
  const [user, setUser] = useState(null);

  console.log(backgroundImage);
  return (
    <div className="login">
      {!user ? (
        <div
          style={{
            backgroundSize: "100% 100%",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
          className="login__form"
        >
          <div className="login__gradientTop" />
          <Nav />
          <LoginCenterContent />
          <div className="login__gradientDown" />
        </div>
      ) : (
        <div>
          <Redirect
            to={{
              pathname: "/dashboard",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default LoginScreen;
